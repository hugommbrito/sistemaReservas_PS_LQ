import { NextFunction, Request, Response } from 'express';
import { ZodTypeAny } from 'zod';
import { AppError } from '../error';

export const validateDataMdwr =
	(schema: ZodTypeAny) =>
	(req: Request, res: Response, next: NextFunction) => {
		const validatedData = schema.parse(req.body);

		req.body = validatedData;

		if (Object.keys(req.body).length < 1) {
			throw new AppError('No valid data was provided', 400);
		}

		return next();
	};
