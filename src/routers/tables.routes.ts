import { Router } from 'express';
import { tableController } from '../controllers';
import { validateTokenMdwr } from '../middlewares/AuthMiddlewares/validateToken.middleware';
import { isStaffMdwr } from '../middlewares/AuthMiddlewares/isStaff.middleware';
import { isTableIdValidMdwr } from '../middlewares/TableMiddlewares/isTableIdValid.middleware';

export const tableRouter = Router();

tableRouter.post('', validateTokenMdwr, isStaffMdwr, tableController.create);
tableRouter.get('', validateTokenMdwr, isStaffMdwr, tableController.readAll);
tableRouter.patch(
	'/:tableID',
	validateTokenMdwr,
	isTableIdValidMdwr,
	isStaffMdwr,
	tableController.update
);
tableRouter.delete(
	'/:tableID',
	validateTokenMdwr,
	isTableIdValidMdwr,
	isStaffMdwr,
	tableController.deleter
);
