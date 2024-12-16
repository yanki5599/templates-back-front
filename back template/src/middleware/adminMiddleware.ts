import { NextFunction, Request, Response } from "express";
import ErrorResponse from "../utils/ErrorResponse";
import asyncHandler from "./asyncHandler";

const adminMiddleware = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  // assuming auth middleware already extracted jwt
  if (req.user && req.user.isAdmin) next();
  else throw new ErrorResponse("Forbidden, Admin only", 403);
});

export default adminMiddleware;
