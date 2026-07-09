import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import dodo from "../config/dodo.js";
import User from "../models/User.js";
import Order from "../models/Order.js";
import { getAuth } from "@clerk/express";

// @desc    Create Dodo Payments Checkout Session
// @route   POST /api/v1/orders/checkout
// @access  Private
export const createCheckoutSession = asyncHandler(async (req, res) => {
  const { cartItems } = req.body;
  const clerkId = getAuth(req).userId;

  if (!cartItems || cartItems.length === 0) {
    throw new ApiError(400, "Cart is empty");
  }

  const user = await User.findOne({ clerkId });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Format cart items for Dodo Payments
  // The SDK uses product_cart: [{ product_id: 'prod_123', quantity: 1 }]
  const product_cart = cartItems.map(item => ({
    product_id: item.dodoProductId || item.id, // Ensure frontend passes the dodoProductId if possible
    quantity: item.quantity
  }));

  // Calculate total
  const totalAmount = cartItems.reduce((acc, item) => acc + item.discountPrice * item.quantity, 0);

  // Create pending order
  const orderItems = cartItems.map(item => ({
    product: item.id,
    name: item.title,
    quantity: item.quantity,
    price: item.discountPrice,
    size: item.size,
    color: item.color,
    image: item.mainImage
  }));

  const order = await Order.create({
    user: user._id,
    orderItems,
    totalAmount,
    paymentStatus: "pending",
    orderStatus: "processing"
  });

  try {
    const session = await dodo.checkoutSessions.create({
      product_cart: product_cart,
      customer_id: user.dodoCustomerId || undefined,
      return_url: `${process.env.CLIENT_URL}/checkout/success`,
      metadata: {
        order_id: order._id.toString()
      }
    });

    res.status(200).json({ success: true, url: session.checkout_url });
  } catch (error) {
    console.error("Dodo Payments Checkout Error:", error);
    // Optionally delete the pending order
    await Order.findByIdAndDelete(order._id);
    throw new ApiError(500, "Failed to initiate checkout session");
  }
});

// @desc    Get user orders
// @route   GET /api/v1/orders
// @access  Private
export const getUserOrders = asyncHandler(async (req, res) => {
  const clerkId = getAuth(req).userId;
  const user = await User.findOne({ clerkId });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const orders = await Order.find({ user: user._id, paymentStatus: { $ne: "pending" } }).sort({ createdAt: -1 });

  res.status(200).json({ success: true, count: orders.length, orders });
});

// @desc    Get all orders (Admin)
// @route   GET /api/v1/orders/all
// @access  Private (Admin only)
export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ paymentStatus: { $ne: "pending" } }).populate("user", "name email phone").sort({ createdAt: -1 });

  res.status(200).json({ success: true, count: orders.length, orders });
});

// @desc    Update order status (Admin)
// @route   PUT /api/v1/orders/:id/status
// @access  Private (Admin only)
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderStatus } = req.body;
  
  if (!orderStatus) {
    throw new ApiError(400, "Order status is required");
  }

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { orderStatus },
    { new: true, runValidators: true }
  );

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  res.status(200).json({ success: true, order });
});
