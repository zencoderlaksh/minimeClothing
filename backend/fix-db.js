import "dotenv/config";
import mongoose from "mongoose";
import User from "./models/User.js";

async function fixDB() {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.db_name}`);
    console.log("Connected to DB");
    
    // The user has _id: "6a4ceba7c4709aa7c1f946d6" and email: "shubham15jakhar@gmail.com"
    // But they are missing clerkId and name. 
    // We need their clerkId. We can get it if they have it, but wait, if we just 
    // delete all users, they can't login? Clerk still has them.
    // Actually, let's just bypass Mongoose validation to see what's in the DB exactly,
    // including any fields not in the schema.
    const rawUsers = await mongoose.connection.db.collection('users').find({}).toArray();
    console.log("Raw Users in DB:", JSON.stringify(rawUsers, null, 2));

    for (let u of rawUsers) {
      const update = {
        $set: {
          name: u.firstName + " " + u.lastName,
        },
        $unset: {
          firstName: "",
          lastName: "",
          avatarUrl: "",
          phoneNumber: "",
          cards: ""
        }
      };

      // If clerkId is completely missing, we have a problem because we need it to link to Clerk.
      // Clerk's user ID starts with "user_". Did the old schema store it as something else?
      if (u.clerkUserId) {
        update.$set.clerkId = u.clerkUserId;
        update.$unset.clerkUserId = "";
      } else if (u.clerk_id) {
        update.$set.clerkId = u.clerk_id;
        update.$unset.clerk_id = "";
      } else if (u.uid) {
        update.$set.clerkId = u.uid;
        update.$unset.uid = "";
      } else if (u.clerkId) {
         // It has clerkId, nothing to do
      } else {
         // Maybe it's stored in _id as a string? "6a4ceba7c4709aa7c1f946d6" is an ObjectId.
      }

      await mongoose.connection.db.collection('users').updateOne({ _id: u._id }, update);
      console.log(`Updated user ${u.email}`);
    }

    const updatedUsers = await mongoose.connection.db.collection('users').find({}).toArray();
    console.log("Updated Raw Users:", JSON.stringify(updatedUsers, null, 2));
    
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

fixDB();
