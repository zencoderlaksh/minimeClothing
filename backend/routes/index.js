import { Router } from "express";
import healthRoutes from "./health.routes.js";
import userRoutes from "./user.routes.js";
import adminRoutes from "./admin.routes.js";
import productRoutes from "./product.routes.js";
import orderRoutes from "./order.routes.js";
import videoRoutes from "./video.routes.js";

const router = Router();

router.use("/", healthRoutes);
router.use("/users", userRoutes);
router.use("/admin", adminRoutes);
router.use("/products", productRoutes);
router.use("/videos", videoRoutes);

// Future
// router.use("/categories", categoryRoutes);
// router.use("/cart", cartRoutes);
router.use("/orders", orderRoutes);

export default router;