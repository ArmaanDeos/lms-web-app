import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadMediaCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });
    return result;
  } catch (error) {
    console.log(error);
    throw new Error(`Error uploading file to Cloudinary: ${error.message}`);
  }
};

const deleteMediaCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.log(error);
    throw new Error(`Error uploading file to Cloudinary: ${error.message}`);
  }
};

export { uploadMediaCloudinary, deleteMediaCloudinary };
