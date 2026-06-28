import { Router } from "express";
import healthRoutes from "./health.routes.js";

const router = Router();

router.use("/", healthRoutes);

// Future
// router.use("/products", productRoutes);
// router.use("/categories", categoryRoutes);
// router.use("/cart", cartRoutes);
// router.use("/orders", orderRoutes);

export default router;