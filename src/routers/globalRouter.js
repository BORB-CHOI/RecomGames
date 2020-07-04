import express from "express";
import routes from "../routes";
import { home } from "../controllers/gameController";
import {
  getJoin,
  getLogin,
  postJoin,
  postLogin,
  logout,
} from "../controllers/userController";
import { onlyPublic, onlyPrivate } from "../middleware";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);

globalRouter.get(routes.join, onlyPublic, getJoin);
// passport로 사용자 등륵, postLogin에서 같은 req를 받기에 passport에서 인증 후 로그인
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.logout, onlyPrivate, logout);

export default globalRouter;
