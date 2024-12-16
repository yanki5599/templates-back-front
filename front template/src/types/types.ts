export type RequestStatus = "Idle" | "Pending" | "Rejected" | "Fulfilled";

export interface IUser {
  _id: string;
  username: string;
  isAdmin: boolean;
  email: string;
  password: string;
}

export interface IUserCredentials {
  email: string;
  password: string;
}

export interface IAddUserDto {
  username: string;
  email: string;
  password: string;
}
