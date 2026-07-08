import { Router } from "express";
import { requireAuth } from "@clerk/express";
import multer from "multer";

import {
  getProfile,
  updateProfile,
  uploadAvatar,
  addAddress,
  updateAddress,
  deleteAddress,
  addPaymentCard,
  updatePaymentCard,
  deletePaymentCard,
} from "../controllers/user.controller.js";

const router = Router();

// Configure multer for memory storage
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Protect all user routes (authentication handled by Clerk)
router.use(requireAuth());

// Profile routes
router.get("/profile", getProfile);
router.put("/profile", updateProfile);
router.post("/avatar", upload.single("image"), uploadAvatar);

// Address routes
router.post("/addresses", addAddress);
router.put("/addresses/:id", updateAddress);
router.delete("/addresses/:id", deleteAddress);

// Payment Card routes
router.post("/cards", addPaymentCard);
router.put("/cards/:id", updatePaymentCard);
router.delete("/cards/:id", deletePaymentCard);

export default router;
