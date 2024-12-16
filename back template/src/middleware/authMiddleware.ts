import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JwtEncryptedUser } from "../types/jwtUserSignature";
import userModel from "../models/userModel";
import asyncHandler from "./asyncHandler";
import ErrorResponse from "../utils/ErrorResponse";

const authMiddleware = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token; // Extract token from cookies

  if (!token) throw new ErrorResponse("Unauthorized, Missing token", 401);

  const decoded: JwtEncryptedUser = jwt.verify(token, process.env.JWT_SECRET!) as JwtEncryptedUser;

  if (!decoded) throw new ErrorResponse("Unauthorized, Invalid token", 401);

  const user = await userModel.findById(decoded._id);

  if (!user) throw new ErrorResponse("Unauthorized, User not found", 401);

  req.user = decoded;

  next();
});

export default authMiddleware;
