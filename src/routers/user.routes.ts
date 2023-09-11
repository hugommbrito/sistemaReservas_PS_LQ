import { Router } from 'express';
import { validateDataMdwr } from '../middlewares/validateData.middleware';
import { userSchema } from '../schemas';
import userControllers from '../controllers/user.controllers';
import { isEmailCpfUniqueMdwr } from '../middlewares/isEmailUnique.middleware';
import { isOwnerOrStaffMdwr } from '../middlewares/isOwnerOrStaff.middleware';
import { validateTokenMdwr } from '../middlewares/validateToken.middleware';

export const userRouter = Router();

userRouter.post(
	'',
	validateDataMdwr(userSchema.post),
	isEmailCpfUniqueMdwr,
	userControllers.create
);

userRouter.patch(
	'/:userID',
	validateDataMdwr(userSchema.patch),
	isOwnerOrStaffMdwr,
	isEmailCpfUniqueMdwr,
	userControllers.update
);

userRouter.delete(
	'/:userID',
	validateTokenMdwr,
	isOwnerOrStaffMdwr,
	userControllers.deleter
);
