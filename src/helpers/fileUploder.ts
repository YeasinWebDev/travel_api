import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { CloudinaryUpload } from "../config/cloudinary.config";

const stroage = new CloudinaryStorage({
  cloudinary: CloudinaryUpload,
  params: {
    public_id: (req, file) => {
      const fileName = file.originalname
        .toLocaleLowerCase()
        .replace(/\s+/g, "-")
        .replace(/\./g, "-")
        .replace(/[^a-z0-9.-]/g, ""); // non alpha numeric - !@#$

      const uniqueFIleName = Math.random().toString(36).substring(2) + "-" + Date.now() + "-" + fileName;

      return uniqueFIleName;
    },
  },
});

export const malterUpload = multer({ storage: stroage, limits: { fileSize: 10 * 1024 * 1024 } });


export const extractPublicIdFromUrl = (url: string): string => {
  const parts = url.split("/");
  const fileWithExtension = parts.pop(); 
  const publicId = fileWithExtension?.split(".")[0]; 
  return publicId!;
};



export const deleteMultipleCloudinaryImages = async (urls: string[]) => {
  try {
    const publicIds = urls.map((url) => extractPublicIdFromUrl(url));

    const results = await Promise.all(
      publicIds.map((id) => CloudinaryUpload.uploader.destroy(id))
    );

    return results;
  } catch (error) {
    console.error("❌ Failed to delete images:", error);
    throw new Error("Failed to delete multiple images");
  }
};
