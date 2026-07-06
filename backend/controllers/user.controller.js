import User from "../models/User.js";
import crypto from "crypto";

// @desc    Get user addresses
// @route   GET /api/v1/users/addresses
// @access  Private
export const getAddresses = async (req, res, next) => {
  try {
    const clerkId = req.auth.userId;
    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, addresses: user.addresses });
  } catch (error) {
    next(error);
  }
};

// @desc    Add a new address
// @route   POST /api/v1/users/addresses
// @access  Private
export const addAddress = async (req, res, next) => {
  try {
    const clerkId = req.auth.userId;
    const { label, street, city, state, zipCode, country, isDefault } = req.body;

    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (isDefault) {
      // Unset any existing default
      user.addresses.forEach((addr) => {
        addr.isDefault = false;
      });
    } else if (user.addresses.length === 0) {
      // First address is always default
      req.body.isDefault = true;
    }

    const newAddress = {
      label: label || "Home",
      street,
      city,
      state,
      zipCode,
      country: country || "India",
      isDefault: req.body.isDefault !== undefined ? req.body.isDefault : isDefault,
    };

    user.addresses.push(newAddress);
    await user.save();

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
    const clerkId = req.auth.userId;
    const addressId = req.params.id;
    const { label, street, city, state, zipCode, country, isDefault } = req.body;

    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const address = user.addresses.id(addressId);
    if (!address) {
      return res.status(404).json({ success: false, message: "Address not found" });
    }

    if (isDefault && !address.isDefault) {
      user.addresses.forEach((addr) => {
        addr.isDefault = false;
      });
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
    const clerkId = req.auth.userId;
    const addressId = req.params.id;

    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.addresses.pull(addressId);
    await user.save();

    res.status(200).json({ success: true, addresses: user.addresses });
  } catch (error) {
    next(error);
  }
};

// @desc    Sync user details from Clerk to DB
// @route   POST /api/v1/users/sync
// @access  Private
export const syncUser = async (req, res, next) => {
  try {
    const clerkId = req.auth.userId;
    const { email, firstName, lastName, avatarUrl, phoneNumber, city } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    let user = await User.findOne({ clerkId });
    if (!user) {
      user = await User.create({
        clerkId,
        email,
        firstName,
        lastName,
        avatarUrl,
        phoneNumber,
        city
      });
      console.log(`[Sync] Created new user in database: ${clerkId}`);
      return res.status(201).json({ success: true, message: "User created and synced", user });
    } else {
      let updated = false;
      if (email && user.email !== email) { user.email = email; updated = true; }
      if (firstName && user.firstName !== firstName) { user.firstName = firstName; updated = true; }
      if (lastName && user.lastName !== lastName) { user.lastName = lastName; updated = true; }
      if (avatarUrl && user.avatarUrl !== avatarUrl) { user.avatarUrl = avatarUrl; updated = true; }
      if (phoneNumber && user.phoneNumber !== phoneNumber) { user.phoneNumber = phoneNumber; updated = true; }
      if (city && user.city !== city) { user.city = city; updated = true; }

      if (updated) {
        await user.save();
        console.log(`[Sync] Updated existing user in database: ${clerkId}`);
      }
      return res.status(200).json({ success: true, message: "User synced and updated", user });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Register a new user directly in DB (without Clerk)
// @route   POST /api/v1/users/register
// @access  Public
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, phoneNumber, city } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ success: false, message: "Name, email, and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User with this email already exists" });
    }

    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");
    const parts = name.split(" ");
    const firstName = parts[0];
    const lastName = parts.slice(1).join(" ");

    const user = await User.create({
      email,
      firstName,
      lastName,
      password: hashedPassword,
      phoneNumber,
      city,
    });

    console.log(`[Register] Created new database-only user: ${user.email}`);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        city: user.city,
      }
    });
  } catch (error) {
    next(error);
  }
};


