import express from "express";
import routes from "../routes";
import {} from "../controllers/js/globalController";

const gameRouter = express.Router();

gameRouter.get(routes.home, (req, res) => {
  console.log(routes.gameDetail);
  res.send("This is games pages");
});
gameRouter.get(routes.gameDetail, (req, res) => {
  const {
    params: { id },
  } = req;
  res.send(`This is Game Detail pages ${id}`);
});

// view 파일을 만들고 연결 해보자

export default gameRouter;
