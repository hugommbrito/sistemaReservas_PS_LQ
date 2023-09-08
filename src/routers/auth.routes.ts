import { Router } from 'express';
import { authController } from '../controllers';
import { validateDataMdwr } from '../middlewares/validateData.middleware';
import { authSchema } from '../schemas';

export const authRouter = Router();

authRouter.post('', validateDataMdwr(authSchema.login), authController.login);
