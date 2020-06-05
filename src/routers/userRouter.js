import express from "express";
import routes from "../routes";
import { getUserProfile } from "../controllers/js/userContrpoller";

const userRouter = express.Router();

userRouter.get(routes.userProfile, getUserProfile);

export default userRouter;
