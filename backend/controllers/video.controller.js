import Video from "../models/Video.js";
import asyncHandler from "../utils/asyncHandler.js";

// @desc    Get all active videos
// @route   GET /api/v1/videos
// @access  Public
export const getVideos = asyncHandler(async (req, res) => {
  const videos = await Video.find({ isActive: true }).sort({ order: 1, createdAt: -1 });

  res.status(200).json({
    success: true,
    count: videos.length,
    videos,
  });
});
