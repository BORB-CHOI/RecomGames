import express from "express";
import routes from "../routes";
import { getHome, getJoin, getLogin } from "../controllers/js/globalController";
// import { get_home } from "../controllers/js/globalController";

const globalRouter = express.Router();

globalRouter.get(routes.home, getHome);
globalRouter.get(routes.join, getJoin);
globalRouter.get(routes.login, getLogin);
globalRouter.get(routes.logout, (req, res) => res.send("You trying logout."));
globalRouter.get(routes.search, (req, res) => res.send("This is search pages"));

export default globalRouter;
