import express from "express";
import routes from "../routes";
import { gameDetail, search } from "../controllers/js/gameController";

const gameRouter = express.Router();

gameRouter.get(routes.search, search);

gameRouter.get(routes.gameDetail(), gameDetail);

// view 파일을 만들고 연결 해보자

export default gameRouter;
