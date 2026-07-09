import Product from "../models/Product.js";
import Video from "../models/Video.js";
import cloudinary from "../config/cloudinary.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import dodo from "../config/dodo.js";

// @desc    Upload product images to Cloudinary (used by Add Product form)
// @route   POST /api/v1/admin/upload-images
// @access  Private/Admin
export const uploadProductImages = asyncHandler(async (req, res) => {
  const files = req.files;
  
  if (!files || files.length === 0) {
    throw new ApiError(400, "No images provided");
  }

  const imageUrls = [];

  for (const file of files) {
    const b64 = Buffer.from(file.buffer).toString("base64");
    let dataURI = "data:" + file.mimetype + ";base64," + b64;
    
    const uploadResponse = await cloudinary.uploader.upload(dataURI, {
      folder: "minime/products",
      resource_type: "auto",
    });

    imageUrls.push(uploadResponse.secure_url);
  }

  res.status(200).json({ success: true, imageUrls });
});

// @desc    Add a new product
// @route   POST /api/v1/admin/products
// @access  Private/Admin
export const addProduct = asyncHandler(async (req, res) => {
  const { name, description, price, originalPrice, category, subCategory, sizes, images, stock, isTrending, isBestSeller } = req.body;

  if (!name || !description || !price || !category || !images || images.length === 0) {
    throw new ApiError(400, "Please provide all required fields including at least one image");
  }

  const product = await Product.create({
    name,
    description,
    price: Number(price),
    originalPrice: originalPrice ? Number(originalPrice) : undefined,
    category,
    subCategory,
    sizes: sizes || [],
    images,
    stock: Number(stock) || 0,
    isTrending: isTrending === true || isTrending === "true",
    isBestSeller: isBestSeller === true || isBestSeller === "true",
  });

  // Sync to Dodo Payments
  try {
    const dodoProduct = await dodo.products.create({
      name: product.name,
      description: product.description,
      image: images[0],
      price: {
        currency: 'INR',
        price: Math.round(product.price * 100), // paise
        type: 'one_time_price',
        discount: 0,
        purchasing_power_parity: false
      },
      tax_category: "digital_products"
    });
    // We could store dodoProduct.product_id if needed
    product.dodoProductId = dodoProduct.product_id;
    await product.save();
  } catch (error) {
    console.error("Failed to sync product to Dodo Payments:", error);
    // Not failing the main request if Dodo fails, but logging it
  }

  res.status(201).json({ success: true, product });
});

// @desc    Edit a product
// @route   PUT /api/v1/admin/products/:id
// @access  Private/Admin
export const editProduct = asyncHandler(async (req, res) => {
  const { name, description, price, originalPrice, category, subCategory, sizes, images, stock, isTrending, isBestSeller } = req.body;

  let product = await Product.findById(req.params.id);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price ? Number(price) : product.price;
  product.originalPrice = originalPrice ? Number(originalPrice) : product.originalPrice;
  product.category = category || product.category;
  product.subCategory = subCategory || product.subCategory;
  product.sizes = sizes || product.sizes;
  if (images && images.length > 0) {
    product.images = images;
  }
  product.stock = stock !== undefined ? Number(stock) : product.stock;
  product.isTrending = isTrending !== undefined ? (isTrending === true || isTrending === "true") : product.isTrending;
  product.isBestSeller = isBestSeller !== undefined ? (isBestSeller === true || isBestSeller === "true") : product.isBestSeller;

  await product.save();

  // Sync to Dodo Payments
  try {
    if (product.dodoProductId) {
      await dodo.products.update(product.dodoProductId, {
        name: product.name,
        description: product.description,
        image: product.images[0],
        price: {
          currency: 'INR',
          price: Math.round(product.price * 100),
          type: 'one_time_price',
          discount: 0,
          purchasing_power_parity: false
        },
        tax_category: "digital_products"
      });
    }
  } catch (error) {
    console.error("Failed to update product in Dodo Payments:", error);
  }

  res.status(200).json({ success: true, product });
});

// @desc    Delete a product
// @route   DELETE /api/v1/admin/products/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  // Delete from Dodo Payments
  try {
    if (product.dodoProductId) {
      await dodo.products.delete(product.dodoProductId);
    }
  } catch (error) {
    console.error("Failed to delete product in Dodo Payments:", error);
  }

  await Product.findByIdAndDelete(productId);

  res.status(200).json({ success: true, message: "Product deleted" });
});

// @desc    Get all products for admin dashboard
// @route   GET /api/v1/admin/products
// @access  Private/Admin
export const getAdminProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, products });
});

// @desc    Upload video to Cloudinary
// @route   POST /api/v1/admin/videos/upload
// @access  Private/Admin
export const uploadVideo = asyncHandler(async (req, res) => {
  const file = req.file;
  
  if (!file) {
    throw new ApiError(400, "No video provided");
  }

  const b64 = Buffer.from(file.buffer).toString("base64");
  const dataURI = "data:" + file.mimetype + ";base64," + b64;
  
  const uploadResponse = await cloudinary.uploader.upload(dataURI, {
    folder: "minime/videos",
    resource_type: "video",
  });

  res.status(200).json({ success: true, url: uploadResponse.secure_url, publicId: uploadResponse.public_id });
});

// @desc    Add a new video
// @route   POST /api/v1/admin/videos
// @access  Private/Admin
export const addVideo = asyncHandler(async (req, res) => {
  const { url, publicId } = req.body;

  if (!url) {
    throw new ApiError(400, "Please provide a video URL");
  }

  const video = await Video.create({
    url,
    publicId: publicId || null,
  });

  res.status(201).json({ success: true, video });
});

// @desc    Delete a video
// @route   DELETE /api/v1/admin/videos/:id
// @access  Private/Admin
export const deleteVideo = asyncHandler(async (req, res) => {
  const videoId = req.params.id;
  const video = await Video.findById(videoId);
  
  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  if (video.publicId) {
    try {
      await cloudinary.uploader.destroy(video.publicId, { resource_type: "video" });
    } catch (error) {
      console.error("Failed to delete video from Cloudinary:", error);
    }
  }

  await Video.findByIdAndDelete(videoId);

  res.status(200).json({ success: true, message: "Video deleted" });
});

// @desc    Get all videos for admin dashboard
// @route   GET /api/v1/admin/videos
// @access  Private/Admin
export const getAdminVideos = asyncHandler(async (req, res) => {
  const videos = await Video.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, videos });
});
