import { Router } from "express";
import { requireAuth } from "@clerk/express";
import { createCheckoutSession, getUserOrders, getAllOrders, updateOrderStatus } from "../controllers/order.controller.js";

const router = Router();

router.post("/checkout", requireAuth(), createCheckoutSession);
router.get("/", requireAuth(), getUserOrders);
router.get("/all", requireAuth(), getAllOrders); // Admin can access this
router.put("/:id/status", requireAuth(), updateOrderStatus); // Admin can access this

export default router;
