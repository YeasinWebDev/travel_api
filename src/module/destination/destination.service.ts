import AppError from "../../errorHelpers/AppError";
import { deleteMultipleCloudinaryImages } from "../../helpers/fileUploder";
import { filterWithPagination } from "../../utils/filterWithPagination";
import { IDestination } from "./destination.interface";
import { Destination } from "./destination.model";

const createDestination = (payload: any) => {
  const destination = Destination.create(payload);
  return destination; 
};

const getAllDestinations = (page: number, limit: number, search: string, division: string, bestTimeToVisit: string) => {
  return filterWithPagination(Destination, {
    page,
    limit,
    search,
    searchFields: ["name"],
    populate: ["division"],
    filters: { division, bestTimeToVisit },
  });
};

const getDestination = (id: string) => {
  const isExists = Destination.findById(id);
  if (!isExists) throw new AppError("Destination does not exist", 400);
  const destination = Destination.findById(id);
  return destination;
};

export const updateDestination = async (id: string, payload: Partial<IDestination>) => {
  const existing = await Destination.findById(id);
  if (!existing) throw new AppError("Destination does not exist", 400);

  // New images coming from payload
  const newImages = payload.image || [];

  // Existing images from DB
  const oldImages = existing.image || [];

  // Identify which images were removed by user
  const removedImages = oldImages.filter(img => !newImages.includes(img));

  // Delete removed images from Cloudinary
  if (removedImages.length > 0) {
    await deleteMultipleCloudinaryImages(removedImages);
  }

  // Final images list (user keeps some + adds new)
  const finalImages = newImages;

  const updatePayload = {
    ...payload,
    image: finalImages,
  };

  const updated = await Destination.findByIdAndUpdate(id, updatePayload, { new: true });

  return updated;
};


const deleteDestination = (id: string) => {
  const isExists = Destination.findById(id);
  if (!isExists) throw new AppError("Destination does not exist", 400);
  const destination = Destination.findByIdAndDelete(id);
  return destination;
};

export const DestinationService = { createDestination, getAllDestinations, getDestination, updateDestination, deleteDestination };
