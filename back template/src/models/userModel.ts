import mongoose, { ObjectId, Schema } from "mongoose";
import validator from "validator";

export interface IUser extends mongoose.Document {
  _id: ObjectId;
  username: string;
  password: string;
  email: string;
  isAdmin: boolean;
}

export const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    lowercase: true,
    minlength: 3,
    maxlength: 20,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
});

export default mongoose.model<IUser>("User", UserSchema);
