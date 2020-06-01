import express from "express";
import routes from "../routes";
import {} from "../controllers/js/globalController";

const gameRouter = express.Router();

gameRouter.get(routes.games, (req, res) => res.send("This is Game List pages"));
gameRouter.get(routes.gameDetail, (req, res) =>
  res.send("This is Game Detail pages")
);

// view 파일을 만들고 연결 해보자

export default gameRouter;
