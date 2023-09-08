import { compare } from 'bcryptjs';
import { AppDataSource } from '../data-source';
import { User } from '../entities';
import { AppError } from '../error';
import { iAuthLogin, iAuthToken } from '../interfaces/auth.interface';
import { iUserRepo } from '../interfaces/user.interface';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const login = async (payload: iAuthLogin): Promise<iAuthToken> => {
	const userRepository: iUserRepo = AppDataSource.getRepository(User);

	const loggedUser: User | null = await userRepository.findOne({
		where: {
			cpf: payload.cpf,
		},
	});

	if (!loggedUser || loggedUser.deletedAt) {
		throw new AppError('Invalid credentials', 401);
	}

	const isPasswordValid: boolean = await compare(
		payload.password,
		loggedUser.password
	);

	if (!isPasswordValid) {
		throw new AppError('Invalid credentials', 401);
	}

	const token: iAuthToken['token'] = jwt.sign(
		{
			id: loggedUser.id,
			staff: loggedUser.is_staff,
			deletedAt: loggedUser.deletedAt,
		},
		process.env.SECRET_KEY!,
		{
			expiresIn: process.env.EXPIRES_IN,
			subject: loggedUser.id.toString(),
		}
	);

	return { token: token };
};

export default { login };
