import { Router } from "express";
import { requireAuth } from "@clerk/express";
import {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  syncUser,
  registerUser,
} from "../controllers/user.controller.js";

const router = Router();

// Public route for direct database signup
router.post("/register", registerUser);

// Protect all other user routes
router.use(requireAuth());

router.post("/sync", syncUser);
router.get("/addresses", getAddresses);
router.post("/addresses", addAddress);
router.put("/addresses/:id", updateAddress);
router.delete("/addresses/:id", deleteAddress);

export default router;
