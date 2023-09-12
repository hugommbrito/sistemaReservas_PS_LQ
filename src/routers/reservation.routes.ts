import { Router } from 'express';
import { reservationController } from '../controllers';
import { validateTokenMdwr } from '../middlewares/AuthMiddlewares/validateToken.middleware';

export const reservationRouter = Router();

reservationRouter.post('', validateTokenMdwr, reservationController.create);
