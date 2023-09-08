import { NextFunction, Request, Response } from 'express';
import { iUserRepo } from '../interfaces/user.interface';
import { AppDataSource } from '../data-source';
import { User } from '../entities';
import { AppError } from '../error';

export const isEmailCpfUniqueMdwr = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const userRepository: iUserRepo = AppDataSource.getRepository(User);
	if (req.body.email) {
		const isEmailExists: User | null = await userRepository.findOne({
			where: {
				email: req.body.email,
			},
		});
		console.log(isEmailExists);
		if (isEmailExists) {
			throw new AppError('Email already exists', 405);
		}
	} else if (req.body.cpf) {
		const isCpfExists: User | null = await userRepository.findOne({
			where: {
				cpf: req.body.cpf,
			},
		});

		if (isCpfExists) {
			throw new AppError('CPF already exists', 400);
		}
	}

	return next();
};
