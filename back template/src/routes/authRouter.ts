import express from "express";

import * as authController from "../controllers/authController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.route("/register").post(authController.register);
router.route("/login").post(authController.login);

router.use(authMiddleware);

router.route("/validate").get(authController.validate);
router.route("/logout").post(authController.logout);

export default router;
