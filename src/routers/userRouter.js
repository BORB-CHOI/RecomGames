import express from "express";
import routes from "../routes";
import {
  getUserProfile,
  getChangePassword,
  postUserProfile,
  getMe,
  userDetail,
} from "../controllers/js/userContrpoller";
import { uploadAvatar } from "../middleware";

const userRouter = express.Router();

userRouter.get(routes.editProfile, getUserProfile);
userRouter.post(routes.editProfile, uploadAvatar, postUserProfile);

userRouter.get(routes.changePassword, getChangePassword);

userRouter.get(routes.me, getMe);

userRouter.get(routes.userDetail(), userDetail);
export default userRouter;
