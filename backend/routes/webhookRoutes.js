import { Router } from "express";
import express from "express";
import { Webhook } from "svix";
import User from "../models/User.js";

const router = Router();

router.post(
  "/clerk",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const SIGNING_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!SIGNING_SECRET) {
      console.error("Error: Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env");
      return res.status(500).json({ success: false, message: "Server misconfiguration" });
    }

    const svix_id = req.headers["svix-id"];
    const svix_timestamp = req.headers["svix-timestamp"];
    const svix_signature = req.headers["svix-signature"];

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return res.status(400).json({ success: false, message: "Error: Missing svix headers" });
    }

    const payload = req.body;
    const wh = new Webhook(SIGNING_SECRET);
    let evt;

    try {
      evt = wh.verify(payload, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      });
    } catch (err) {
      console.error("Error: Could not verify webhook:", err.message);
      return res.status(400).json({ success: false, message: err.message });
    }

    const { id } = evt.data;
    const eventType = evt.type;

    if (eventType === "user.created") {
      try {
        const { email_addresses, first_name, last_name, image_url, unsafe_metadata } = evt.data;
        const email = email_addresses && email_addresses.length > 0 ? email_addresses[0].email_address : "";
        const phoneNumber = unsafe_metadata?.phoneNumber || "";
        const city = unsafe_metadata?.city || "";

        await User.create({
          clerkId: id,
          email,
          firstName: first_name,
          lastName: last_name,
          avatarUrl: image_url,
          phoneNumber,
          city
        });

        console.log(`User created and saved to db: ${id}`);
      } catch (error) {
        console.error("Error saving user to DB:", error);
        return res.status(500).json({ success: false, message: "Error saving user to DB" });
      }
    } else if (eventType === "user.updated") {
      try {
        const { email_addresses, first_name, last_name, image_url, unsafe_metadata } = evt.data;
        const email = email_addresses && email_addresses.length > 0 ? email_addresses[0].email_address : "";
        const phoneNumber = unsafe_metadata?.phoneNumber || "";
        const city = unsafe_metadata?.city || "";

        await User.findOneAndUpdate(
          { clerkId: id },
          { email, firstName: first_name, lastName: last_name, avatarUrl: image_url, phoneNumber, city },
          { new: true }
        );
      } catch (error) {
        console.error("Error updating user in DB:", error);
      }
    } else if (eventType === "user.deleted") {
      try {
        await User.findOneAndDelete({ clerkId: id });
      } catch (error) {
        console.error("Error deleting user from DB:", error);
      }
    }

    return res.status(200).json({ success: true, message: "Webhook processed" });
  }
);

export default router;
