import express from "express";
import routes from "../routes";
import {
  getUserProfile,
  getChangePassword,
  postUserProfile,
  getMe,
  userProfile,
} from "../controllers/userContrpoller";
import { uploadAvatar, onlyPrivate } from "../middleware";

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, getUserProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postUserProfile);

userRouter.get(routes.changePassword, onlyPrivate, getChangePassword);

userRouter.get(routes.me, onlyPrivate, getMe);

userRouter.get(routes.userProfile(), userProfile);
export default userRouter;
