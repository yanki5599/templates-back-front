import { NextFunction, Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import { createResponse } from "../utils/utils";
import * as UserService from "../services/usersService";

export const getAllUsers = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  res
    .status(200)
    .json(createResponse(await UserService.getAllUsers(), "users fetched successfully"));
});
