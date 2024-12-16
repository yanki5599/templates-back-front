import userModel, { IUser } from "../models/userModel";

export const getAllUsers = async (): Promise<IUser[]> => {
  return await userModel.find();
};
