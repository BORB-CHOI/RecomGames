import express from "express";
import routes from "../routes";
import { home } from "../controllers/gameController";
import {
  getJoin,
  getLogin,
  postJoin,
  postLogin,
  logout,
} from "../controllers/userContrpoller";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);

globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin);

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.logout, logout);

export default globalRouter;
