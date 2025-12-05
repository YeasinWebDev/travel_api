import AppError from "../../errorHelpers/AppError";
import { filterWithPagination } from "../../utils/filterWithPagination";
import { IDestination } from "./destination.interface";
import { Destination } from "./destination.model";

const createDestination = (payload: Partial<IDestination>) => {
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

const updateDestination = (id: string, payload: Partial<IDestination>) => {
  const isExists = Destination.findById(id);
  if (!isExists) throw new AppError("Destination does not exist", 400);
  const destination = Destination.findByIdAndUpdate(id, payload, { new: true });
  return destination;
};

const deleteDestination = (id: string) => {
  const isExists = Destination.findById(id);
  if (!isExists) throw new AppError("Destination does not exist", 400);
  const destination = Destination.findByIdAndDelete(id);
  return destination;
};

export const DestinationService = { createDestination, getAllDestinations, getDestination, updateDestination, deleteDestination };
