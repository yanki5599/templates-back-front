import mongoose from "mongoose";
import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const SALT_ROUNDS = 10;
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    await seedDB();
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

async function seedDB() {
  if ((await userModel.countDocuments()) === 0) {
    await seedUsers();
  }
}

const seedUsers = async () => {
  try {
    const defaultAdminUser = {
      username: "admin",
      isAdmin: true,
      password: await bcrypt.hash("admin", SALT_ROUNDS),
      email: "admin@gmail.com",
    };

    const defaultUser = {
      username: "user",
      isAdmin: false,
      password: await bcrypt.hash("user", SALT_ROUNDS),
      email: "user@gmail.com",
    };

    const users = [defaultAdminUser, defaultUser];
    await userModel.insertMany(users);

    console.log("Users seeded successfully.");
  } catch (error) {
    console.error("Error seeding users:", error);
  }
};
