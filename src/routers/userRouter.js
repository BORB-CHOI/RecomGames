import express from "express";
import routes from "../routes";

const userRouter = express.Router();

userRouter.get(routes.userDetail, (req, res) =>
  res.send("This is User Detail pages")
);

export default userRouter;
