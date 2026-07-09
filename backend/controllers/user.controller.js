import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";
import { getAuth } from "@clerk/express";
import dodo from "../config/dodo.js";

// @desc    Sync user from Clerk to DB
// @route   POST /api/v1/users/sync
// @access  Private
export const syncUser = async (req, res, next) => {
  try {
    const clerkId = getAuth(req).userId;
    if (!clerkId) return res.status(401).json({ success: false, message: "Unauthorized" });

    const { email, firstName, lastName, avatar, phone } = req.body;
    const name = `${firstName || ""} ${lastName || ""}`.trim();

    let user = await User.findOne({ clerkId });
    if (!user) {
      user = await User.create({
        clerkId,
        email,
        name: name || "User",
        avatar: avatar || "",
        phone: phone || "",
      });
    } else {
      user.email = email || user.email;
      if (name) user.name = name;
      if (avatar) user.avatar = avatar;
      if (phone) user.phone = phone;
      await user.save();
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error in syncUser:", error);
    next(error);
  }
};

// Helper to extract public ID from Cloudinary URL
const extractPublicId = (url) => {
  if (!url) return null;
  try {
    const parts = url.split("/");
    const folderPath = parts.slice(parts.indexOf("minime")).join("/").split(".")[0];
    return folderPath;
  } catch (e) {
    return null;
  }
};

// @desc    Get complete user profile
// @route   GET /api/v1/users/profile
// @access  Private
export const getProfile = async (req, res, next) => {
  try {
    const clerkId = getAuth(req).userId;
    let user = await User.findOne({ clerkId });
    if (!user) {
      console.log("[Profile] User not found, creating fallback user for:", clerkId);
      user = await User.create({
        clerkId,
        name: "User",
        email: `${clerkId}@placeholder.com`,
      });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload avatar to Cloudinary and update profile
// @route   POST /api/v1/users/avatar
// @access  Private
export const uploadAvatar = async (req, res, next) => {
  try {
    console.log("[Avatar Upload] Starting for user:", getAuth(req).userId);
    const clerkId = getAuth(req).userId;
    const user = await User.findOne({ clerkId });
    
    if (!user) {
      console.log("[Avatar Upload] User not found in DB");
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (!req.file) {
      console.log("[Avatar Upload] No file received in req.file");
      return res.status(400).json({ success: false, message: "No image file provided" });
    }

    console.log(`[Avatar Upload] Received file: ${req.file.originalname}, Size: ${req.file.size}`);

    // Delete old avatar if it exists and is hosted on Cloudinary
    if (user.avatar && user.avatar.includes("cloudinary.com")) {
      const oldPublicId = extractPublicId(user.avatar);
      if (oldPublicId) {
        console.log(`[Avatar Upload] Deleting old avatar: ${oldPublicId}`);
        await cloudinary.uploader.destroy(oldPublicId).catch((err) => console.log("Failed to delete old avatar:", err));
      }
    }

    // Upload new image from memory buffer to Cloudinary
    console.log("[Avatar Upload] Uploading to Cloudinary...");
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    
    const uploadResponse = await cloudinary.uploader.upload(dataURI, {
      folder: "minime/avatar",
      resource_type: "auto",
    });

    console.log("[Avatar Upload] Cloudinary upload successful:", uploadResponse.secure_url);

    user.avatar = uploadResponse.secure_url;
    await user.save();

    res.status(200).json({ success: true, avatar: user.avatar });
  } catch (error) {
    console.error("[Avatar Upload] Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update basic profile fields (not handled by Clerk, or syncing them back)
// @route   PUT /api/v1/users/profile
// @access  Private
export const updateProfile = async (req, res, next) => {
  try {
    const clerkId = getAuth(req).userId;
    const { name } = req.body;

    const user = await User.findOneAndUpdate(
      { clerkId },
      { name },
      { new: true }
    );
    
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Sync to Dodo Payments
    try {
      if (!user.dodoCustomerId) {
        const dodoCustomer = await dodo.customers.create({
          name: user.name,
          email: user.email,
          phone_number: user.phone || ""
        });
        user.dodoCustomerId = dodoCustomer.customer_id;
        await user.save();
      } else {
        await dodo.customers.update(user.dodoCustomerId, {
          name: user.name,
        });
      }
    } catch (err) {
      console.error("Failed to sync profile to Dodo Payments:", err);
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

// @desc    Add a new address
// @route   POST /api/v1/users/addresses
// @access  Private
export const addAddress = async (req, res, next) => {
  try {
    const clerkId = getAuth(req).userId;
    const { label, street, city, state, zipCode, country, isDefault } = req.body;

    const user = await User.findOne({ clerkId });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    if (user.addresses.length >= 10) {
      return res.status(400).json({ success: false, message: "Maximum limit of 10 addresses reached." });
    }

    if (isDefault) {
      user.addresses.forEach((addr) => (addr.isDefault = false));
    } else if (user.addresses.length === 0) {
      req.body.isDefault = true;
    }

    user.addresses.push({
      label: label || "Home",
      street,
      city,
      state,
      zipCode,
      country: country || "India",
      isDefault: req.body.isDefault !== undefined ? req.body.isDefault : isDefault,
    });

    await user.save();

    // Sync address to Dodo Payments Customer
    try {
      if (user.dodoCustomerId) {
        // Mocking the sync based on generic structure
        await dodo.customers.update(user.dodoCustomerId, {
          billing_address: {
            street: street,
            city: city,
            state: state,
            zipcode: zipCode,
            country: country || "India"
          }
        });
      }
    } catch (err) {
      console.error("Failed to sync address to Dodo Payments:", err);
    }

    res.status(201).json({ success: true, addresses: user.addresses });
  } catch (error) {
    next(error);
  }
};

// @desc    Update an address
// @route   PUT /api/v1/users/addresses/:id
// @access  Private
export const updateAddress = async (req, res, next) => {
  try {
    const clerkId = getAuth(req).userId;
    const addressId = req.params.id;
    const { label, street, city, state, zipCode, country, isDefault } = req.body;

    const user = await User.findOne({ clerkId });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const address = user.addresses.id(addressId);
    if (!address) return res.status(404).json({ success: false, message: "Address not found" });

    if (isDefault && !address.isDefault) {
      user.addresses.forEach((addr) => (addr.isDefault = false));
    }

    if (label) address.label = label;
    if (street) address.street = street;
    if (city) address.city = city;
    if (state) address.state = state;
    if (zipCode) address.zipCode = zipCode;
    if (country) address.country = country;
    if (isDefault !== undefined) address.isDefault = isDefault;

    await user.save();
    res.status(200).json({ success: true, addresses: user.addresses });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete an address
// @route   DELETE /api/v1/users/addresses/:id
// @access  Private
export const deleteAddress = async (req, res, next) => {
  try {
    const clerkId = getAuth(req).userId;
    const addressId = req.params.id;

    const user = await User.findOne({ clerkId });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.addresses.pull(addressId);
    await user.save();
    res.status(200).json({ success: true, addresses: user.addresses });
  } catch (error) {
    next(error);
  }
};

// @desc    Add a payment card
// @route   POST /api/v1/users/cards
// @access  Private
export const addPaymentCard = async (req, res, next) => {
  try {
    const clerkId = getAuth(req).userId;
    const { cardNumber, expMonth, expYear, cvc, name, brand } = req.body;
    
    const user = await User.findOne({ clerkId });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    if (user.paymentCards.length >= 3) {
      return res.status(400).json({ success: false, message: "Maximum limit of 3 credit cards reached." });
    }

    const last4 = cardNumber ? cardNumber.slice(-4) : "0000";

    const newCard = {
      tokenId: `mock_tok_${Math.random().toString(36).substring(7)}`,
      last4,
      brand: brand || "Visa",
      expMonth: expMonth || 12,
      expYear: expYear || 2028,
    };

    user.paymentCards.push(newCard);
    await user.save();

    // Sync card to Dodo Payments (in a real scenario, this involves securely passing a token)
    try {
      if (user.dodoCustomerId) {
        // Simulating attaching a payment method
        console.log(`Syncing card ${last4} to Dodo Customer ${user.dodoCustomerId}`);
        // await dodo.customers.paymentMethods.create(...)
      }
    } catch (err) {
      console.error("Failed to sync card to Dodo Payments:", err);
    }

    res.status(201).json({ success: true, paymentCards: user.paymentCards });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a payment card
// @route   PUT /api/v1/users/cards/:id
// @access  Private
export const updatePaymentCard = async (req, res, next) => {
  try {
    const clerkId = getAuth(req).userId;
    const cardId = req.params.id;
    const { cardNumber, expMonth, expYear, brand } = req.body;

    const user = await User.findOne({ clerkId });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const card = user.paymentCards.id(cardId);
    if (!card) return res.status(404).json({ success: false, message: "Card not found" });

    if (cardNumber && cardNumber.length >= 4) {
      card.last4 = cardNumber.slice(-4);
    }
    if (brand) card.brand = brand;
    if (expMonth) card.expMonth = expMonth;
    if (expYear) card.expYear = expYear;

    await user.save();
    res.status(200).json({ success: true, paymentCards: user.paymentCards });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a payment card
// @route   DELETE /api/v1/users/cards/:id
// @access  Private
export const deletePaymentCard = async (req, res, next) => {
  try {
    const clerkId = getAuth(req).userId;
    const cardId = req.params.id;

    const user = await User.findOne({ clerkId });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.paymentCards.pull(cardId);
    await user.save();
    res.status(200).json({ success: true, paymentCards: user.paymentCards });
  } catch (error) {
    next(error);
  }
};

// @desc    Merge local cart with database cart
// @route   POST /api/v1/users/cart/merge
// @access  Private
export const mergeCart = async (req, res, next) => {
  try {
    const clerkId = getAuth(req).userId;
    const { localCart } = req.body;
    
    const user = await User.findOne({ clerkId });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    let dbCart = user.cartItems || [];
    const local = localCart || [];

    // Simple merge: for each item in local, if it exists in dbCart, take max quantity.
    // If it doesn't exist, push it.
    local.forEach(localItem => {
      const existingIdx = dbCart.findIndex(dbItem => 
        dbItem.id === localItem.id && 
        dbItem.size === localItem.size && 
        dbItem.color?.name === localItem.color?.name
      );

      if (existingIdx !== -1) {
        dbCart[existingIdx].quantity = Math.max(dbCart[existingIdx].quantity, localItem.quantity);
      } else {
        dbCart.push(localItem);
      }
    });

    user.cartItems = dbCart;
    // Mark as modified since it's a mixed/array type and we mutated it directly
    user.markModified('cartItems');
    await user.save();

    res.status(200).json({ success: true, cart: user.cartItems });
  } catch (error) {
    next(error);
  }
};

// @desc    Update/Overwrite database cart
// @route   PUT /api/v1/users/cart
// @access  Private
export const updateCart = async (req, res, next) => {
  try {
    const clerkId = getAuth(req).userId;
    const { cart } = req.body;
    
    const user = await User.findOne({ clerkId });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.cartItems = cart || [];
    user.markModified('cartItems');
    await user.save();

    res.status(200).json({ success: true, cart: user.cartItems });
  } catch (error) {
    next(error);
  }
};

// @desc    Get database cart
// @route   GET /api/v1/users/cart
// @access  Private
export const getCart = async (req, res, next) => {
  try {
    const clerkId = getAuth(req).userId;
    const user = await User.findOne({ clerkId });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.status(200).json({ success: true, cart: user.cartItems || [] });
  } catch (error) {
    next(error);
  }
};
