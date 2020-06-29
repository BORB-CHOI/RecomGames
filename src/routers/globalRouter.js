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
// passport로 사용자 등륵, postLogin에서 같은 req를 받기에 passport에서 인증 후 로그인
globalRouter.post(routes.join, postJoin, postLogin);

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.logout, logout);

export default globalRouter;
