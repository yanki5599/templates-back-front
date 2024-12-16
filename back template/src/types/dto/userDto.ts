import { IUser } from "../../models/userModel";

export interface IAddUserDto {
  username: string;
  email: string;
  password: string;
}

export interface IUserResDto extends Omit<IUser, "password"> {}

export interface ILoginUserDto {
  email: string;
  password: string;
}
