import { Router } from "express";
import { requireAuth } from "@clerk/express";
import multer from "multer";

import { isAdmin } from "../middleware/auth.middleware.js";
import {
  addProduct,
  editProduct,
  deleteProduct,
  getAdminProducts,
  uploadProductImages,
  uploadVideo,
  addVideo,
  deleteVideo,
  getAdminVideos,
} from "../controllers/admin.controller.js";

const router = Router();

// Configure multer for memory storage
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit per file
});

// Protect all admin routes
router.use(requireAuth());
router.use(isAdmin);

// Product management
router.get("/products", getAdminProducts);
router.post("/products", addProduct);
router.put("/products/:id", editProduct);
router.delete("/products/:id", deleteProduct);
router.post("/upload-images", upload.array("images", 5), uploadProductImages);

// Video management
router.get("/videos", getAdminVideos);
router.post("/videos", addVideo);
router.delete("/videos/:id", deleteVideo);
router.post("/videos/upload", upload.single("video"), uploadVideo);

export default router;
