import "dotenv/config";
import mongoose from "mongoose";
import User from "./models/User.js";

async function test() {
  await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.db_name}`);
  console.log("Connected to DB");
  
  const users = await User.find({});
  console.log("Users in DB:", JSON.stringify(users, null, 2));
  
  process.exit(0);
}

test();
