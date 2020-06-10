import express from "express";
import routes from "../routes";
import {
  getUserProfile,
  getChangePassword,
} from "../controllers/js/userContrpoller";

const userRouter = express.Router();

userRouter.get(routes.editProfile, getUserProfile);

userRouter.get(routes.changePassword, getChangePassword);

export default userRouter;
