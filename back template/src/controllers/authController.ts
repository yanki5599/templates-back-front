import { NextFunction, Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import Jwt from "jsonwebtoken";
import * as AuthService from "../services/authService";
import userModel from "../models/userModel";
import ErrorResponse from "../utils/ErrorResponse";
import { createResponse } from "../utils/utils";
import { IAddUserDto, ILoginUserDto, IUserResDto } from "../types/dto/userDto";
import { JwtEncryptedUser } from "../types/jwtUserSignature";

export const register = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const userDto: IAddUserDto = req.body;

  const user: IUserResDto = await AuthService.addUser(userDto);
  res.status(201).json(createResponse({ user }, "user created successfully"));
});

export const login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const loginUserDto: ILoginUserDto = req.body;

  const user: IUserResDto = await AuthService.authenticate(loginUserDto);
  const jwtUser: JwtEncryptedUser = { ...user };

  // JWT
  const token = Jwt.sign(jwtUser, process.env.JWT_SECRET as string, { expiresIn: "1h" });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 3600000,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  res.status(200).json(createResponse({ user }, "logged in successfully"));
});

export const validate = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const user = await userModel.findById(req.user?._id);

  if (!user) throw new ErrorResponse("internal error: user not found", 500); // impossible after auth middleware
  res
    .status(200)
    .json(createResponse({ user: AuthService.createUserResDto(user) }, "validated successfully"));
});

export const logout = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res
    .clearCookie("token", { path: "/" })
    .status(200)
    .json(createResponse({}, "logged out successfully"));
});
