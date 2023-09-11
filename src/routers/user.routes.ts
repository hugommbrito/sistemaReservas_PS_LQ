import { Router } from 'express';
import { validateDataMdwr } from '../middlewares/validateData.middleware';
import { userSchema } from '../schemas';
import { userController } from '../controllers';
import { isEmailCpfUniqueMdwr } from '../middlewares/UserMiddlewares/isEmailCpfUnique.middleware';
import { isOwnerOrStaffMdwr } from '../middlewares/AuthMiddlewares/isOwnerOrStaff.middleware';
import { validateTokenMdwr } from '../middlewares/AuthMiddlewares/validateToken.middleware';
import { isStaffMdwr } from '../middlewares/AuthMiddlewares/isStaff.middleware';
import { isUserIdValidMdwr } from '../middlewares/UserMiddlewares/isUserIdValid.middleware';

export const userRouter = Router();

userRouter.post(
	'',
	validateDataMdwr(userSchema.post),
	isEmailCpfUniqueMdwr,
	userController.create
);

userRouter.get('', validateTokenMdwr, isStaffMdwr, userController.readAll);

userRouter.patch(
	'/:userID',
	validateDataMdwr(userSchema.patch),
	isUserIdValidMdwr,
	isOwnerOrStaffMdwr,
	isEmailCpfUniqueMdwr,
	userController.update
);

userRouter.delete(
	'/:userID',
	validateTokenMdwr,
	isUserIdValidMdwr,
	isOwnerOrStaffMdwr,
	userController.deleter
);

userRouter.patch(
	'/changeStaff/:userID',
	validateTokenMdwr,
	isUserIdValidMdwr,
	isStaffMdwr,
	userController.changeStaff
);
