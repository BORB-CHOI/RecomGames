import express from "express";
import routes from "../routes";
import { home, search } from "../controllers/js/gameController";
import {
  getJoin,
  getLogin,
  postJoin,
  postLogin,
  logout,
  getMe,
} from "../controllers/js/userContrpoller";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);

globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin);

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.logout, logout);

globalRouter.get(routes.search, search);

globalRouter.get(routes.me, getMe);

export default globalRouter;
