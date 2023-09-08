import { Router } from 'express';
import { validateDataMdwr } from '../middlewares/validateData.middleware';
import { userSchema } from '../schemas';
import userControllers from '../controllers/user.controllers';
import { isEmailCpfUniqueMdwr } from '../middlewares/isEmailUnique.middleware';

export const userRouter = Router();

userRouter.post(
	'',
	validateDataMdwr(userSchema.post),
	isEmailCpfUniqueMdwr,
	userControllers.create
);

userRouter.patch(
	'/:userID',
	// validateDataMdwr(userSchema.patch),
	isEmailCpfUniqueMdwr,
	userControllers.update
);

userRouter.delete('/:userID', userControllers.deleter);
