import { Router } from "express";
import { getVideos } from "../controllers/video.controller.js";

const router = Router();

// Public video routes
router.get("/", getVideos);

export default router;
