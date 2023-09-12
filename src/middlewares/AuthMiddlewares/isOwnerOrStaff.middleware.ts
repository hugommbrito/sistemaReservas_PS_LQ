import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../error';

export const isOwnerOrStaffMdwr = (
	req: Request,
	res: Response,
	next: NextFunction
): Response | void => {
	if (req.user.isStaff) {
		return next();
	}

	const ownerId: string = req.body.created_by || req.params.userID;

	if (ownerId !== req.user.id) {
		throw new AppError('User not authorized', 403);
	}

	return next();
};
