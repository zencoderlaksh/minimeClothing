import { getAuth } from "@clerk/express";
import User from "../models/user.model.js";
import clerkClient from "../config/clerk.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

const authMiddleware = asyncHandler(async (req, res, next) => {
  const { userId } = getAuth(req);

  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }

  let user = await User.findOne({ clerkId: userId });

  if (!user) {
    const clerkUser = await clerkClient.users.getUser(userId);

    const email = clerkUser.emailAddresses?.[0]?.emailAddress;

    if (!email) {
      throw new ApiError(400, "Email not found");
    }

    user = await User.create({
      clerkId: clerkUser.id,
      name:
        `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
      email,
      image: clerkUser.imageUrl || "",
      phoneNumber: clerkUser.phoneNumbers?.[0]?.phoneNumber || "",
    });
  }

  req.user = user;

  next();
});

export default authMiddleware;