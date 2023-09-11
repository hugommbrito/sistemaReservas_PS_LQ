import { Router } from 'express';
import { validateDataMdwr } from '../middlewares/validateData.middleware';
import { userSchema } from '../schemas';
import userControllers from '../controllers/user.controllers';
import { isEmailCpfUniqueMdwr } from '../middlewares/isEmailUnique.middleware';
import { isOwnerOrStaffMdwr } from '../middlewares/isOwnerOrStaff.middleware';
import { validateTokenMdwr } from '../middlewares/validateToken.middleware';
import { isStaffMdwr } from '../middlewares/isStaff.middleware';
import { isUserIdValidMdwr } from '../middlewares/isUserIdValid.middleware';

export const userRouter = Router();

userRouter.post(
	'',
	validateDataMdwr(userSchema.post),
	isEmailCpfUniqueMdwr,
	userControllers.create
);

userRouter.get('', validateTokenMdwr, isStaffMdwr, userControllers.getAll);

userRouter.patch(
	'/:userID',
	validateDataMdwr(userSchema.patch),
	isUserIdValidMdwr,
	isOwnerOrStaffMdwr,
	isEmailCpfUniqueMdwr,
	userControllers.update
);

userRouter.delete(
	'/:userID',
	validateTokenMdwr,
	isUserIdValidMdwr,
	isOwnerOrStaffMdwr,
	userControllers.deleter
);

userRouter.patch(
	'/changeStaff/:userID',
	validateTokenMdwr,
	isUserIdValidMdwr,
	isStaffMdwr,
	userControllers.changeStaff
);
