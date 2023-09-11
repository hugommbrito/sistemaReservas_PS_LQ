import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../error';

export const isStaffMdwr = (
	req: Request,
	res: Response,
	next: NextFunction
): Response | void => {
	if (!req.user.isStaff) {
		throw new AppError('User not authorized', 403);
	}

	return next();
};
