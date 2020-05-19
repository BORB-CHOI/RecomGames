import express from 'express';
import routes from '../routes';

const globalRouter = express.Router();

globalRouter.get(routes.home, (req, res) => res.send('This is home pages'));
globalRouter.get(routes.join, (req, res) => res.send('This is join pages'));

export default globalRouter;
