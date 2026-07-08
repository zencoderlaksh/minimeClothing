import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function test() {
  try {
    console.log("Cloudinary Config:");
    console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
    console.log("API Key:", process.env.CLOUDINARY_API_KEY);
    
    // A tiny 1x1 red pixel image
    const dataURI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";
    
    console.log("Uploading to Cloudinary...");
    const res = await cloudinary.uploader.upload(dataURI, {
      folder: "minime_avatars_test",
      resource_type: "auto",
    });
    console.log("Upload Success! URL:", res.secure_url);
    
    // Clean up
    await cloudinary.uploader.destroy(res.public_id);
    console.log("Cleaned up test image.");
  } catch (error) {
    console.error("Upload failed!");
    console.error(error);
  }
}

test();
