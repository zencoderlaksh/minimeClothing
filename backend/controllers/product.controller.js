import Product from "../models/Product.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

// @desc    Get all active products with filtering
// @route   GET /api/v1/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
  const { category, isTrending, isBestSeller, newArrivals } = req.query;

  let query = { isActive: true };

  if (category) {
    query.category = category;
  }

  if (isTrending === "true") {
    query.isTrending = true;
  }

  if (isBestSeller === "true") {
    query.isBestSeller = true;
  }

  if (newArrivals === "true") {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    query.createdAt = { $gte: thirtyDaysAgo };
  }

  const products = await Product.find(query).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
});

// @desc    Get single product by ID
// @route   GET /api/v1/products/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product || !product.isActive) {
    throw new ApiError(404, "Product not found");
  }

  res.status(200).json({
    success: true,
    product,
  });
});
