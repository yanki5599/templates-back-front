import { ObjectId } from "mongoose";

// makes user available in request
declare global {
  namespace Express {
    interface Request {
      user?: JwtEncryptedUser;
    }
  }
}

export interface JwtEncryptedUser {
  _id: ObjectId;
  isAdmin: Boolean;
  username: string;
  email: string;
}
