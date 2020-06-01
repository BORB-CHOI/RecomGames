import express from "express";
import routes from "../routes";
import { get_home } from "../controllers/js/globalController";

const globalRouter = express.Router();

globalRouter.get(routes.home, get_home);
globalRouter.get(routes.join, (req, res) => res.send("This is join pages"));
globalRouter.get(routes.login, (req, res) => res.send("This is login pages"));
globalRouter.get(routes.logout, (req, res) => res.send("This is logout pages"));
globalRouter.get(routes.search, (req, res) => res.send("This is search pages"));

globalRouter.get(routes.games, (req, res) =>
  res.send("Wherer is Games pages?")
);

export default globalRouter;
