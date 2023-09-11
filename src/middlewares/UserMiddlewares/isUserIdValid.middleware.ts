import { NextFunction, Request, Response } from 'express';
import { iUserRepo } from '../../interfaces/user.interface';
import { AppDataSource } from '../../data-source';
import { User } from '../../entities';
import { AppError } from '../../error';

export const isUserIdValidMdwr = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const userRepository: iUserRepo = AppDataSource.getRepository(User);

	const isUserExists: boolean = await userRepository.exist({
		where: {
			id: req.params.userID,
		},
	});

	if (!isUserExists) {
		throw new AppError('User not found', 404);
	}

	return next();
};
