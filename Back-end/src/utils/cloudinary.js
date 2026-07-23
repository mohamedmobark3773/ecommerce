//src/utils/cloudinary.js

import { v2 as cloudinary } from 'cloudinary';



export const configureCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};  

export const uploadToCloudinary = async (fileBuffer, resourceType = "image") => {
  try {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: resourceType,
        folder: "ecommerce",
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          throw new ApiError(500, "Failed to upload file to Cloudinary.");
        }
        return result;
      }
    );
    uploadStream.end(fileBuffer);
  } catch (error) {
        throw error;
  }
};

export const deleteFromCloudinary = async (publicId, resourceType = "image") => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
    return result;
  } catch (error) {
    throw error;
  }
};    

export const getCloudinaryResource = async (publicId, resourceType = "image") => {
  try {
    const result = await cloudinary.api.resource(publicId, {
      resource_type: resourceType,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

export default cloudinary;