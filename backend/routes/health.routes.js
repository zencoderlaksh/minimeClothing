import { Router } from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/health", (req, res) => {
  res.status(200).json({ success: true, message: "API is running" });
});

router.post("/test-upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image provided" });
    }
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const uploadResponse = await cloudinary.uploader.upload(dataURI, {
      folder: "minime_avatars",
      resource_type: "auto",
    });
    res.status(200).json({ success: true, url: uploadResponse.secure_url });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message, stack: err.stack });
  }
});

export default router;