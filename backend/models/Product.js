import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    originalPrice: {
      type: Number,
    },
    category: {
      type: String,
      required: true,
      enum: ["Women", "Kids", "Accessories", "Other"],
    },
    subCategory: {
      type: String,
    },
    sizes: [
      {
        type: String,
      },
    ],
    images: [
      {
        type: String,
        required: true,
      },
    ],
    stock: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isTrending: {
      type: Boolean,
      default: false,
    },
    isBestSeller: {
      type: Boolean,
      default: false,
    },
    dodoProductId: {
      type: String,
      default: null
    }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
