import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    addresses: [
      {
        label: { type: String, default: "Home" },
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
        country: { type: String, default: "India" },
        isDefault: { type: Boolean, default: false },
      },
    ],
    paymentCards: [
      {
        tokenId: { type: String, required: true },
        last4: { type: String, required: true },
        brand: { type: String, required: true },
        expMonth: { type: Number, required: true },
        expYear: { type: Number, required: true },}
    ],
    dodoCustomerId: {
      type: String,
      default: null,
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
