import { Router } from 'express';

import YouTubeController from './app/controllers/YouTubeController';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import TimeController from './app/controllers/TimeController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/time/:user_id', TimeController.getUserTime);
routes.put('/time/:user_id', TimeController.saveUserTime);
routes.post('/videos', YouTubeController.search);

export default routes;
