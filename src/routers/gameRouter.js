import express from 'express';
import routes from '../routes';

const gameRouter = express.Router();

gameRouter.get(routes.games, (req, res) => res.send('This is game list pages'));

export default gameRouter;
