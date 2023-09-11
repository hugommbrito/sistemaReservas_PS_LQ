import { NextFunction, Request, Response } from 'express';
import { AppError } from '../error';
import { verify } from 'jsonwebtoken';

export const validateTokenMdwr = (
	req: Request,
	res: Response,
	next: NextFunction
): Response | void => {
	const authToken: string | undefined = req.headers.authorization;

	if (!authToken) {
		throw new AppError('Missing bearer Token', 401);
	}

	const token: string = authToken.split(' ')[1];

	return verify(
		token,
		process.env.SECRET_KEY!,
		(error: any, decoded: any) => {
			if (error) {
				throw new AppError(error.message, 401);
			}

			req.user = {
				id: decoded.id,
				isStaff: decoded.isStaff,
				deletedAt: decoded.deletedAt,
			};

			return next();
		}
	);
};
