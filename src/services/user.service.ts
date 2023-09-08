import { AppDataSource } from '../data-source';
import { User } from '../entities';
import { iUserGet, iUserPost, iUserRepo } from '../interfaces/user.interface';
import { userSchema } from '../schemas';

const create = async (payload: iUserPost): Promise<iUserGet> => {
	const userRepository: iUserRepo = AppDataSource.getRepository(User);
	let newUser: User = userRepository.create(payload);

	await userRepository.save(newUser);

	const newUserData: iUserGet = userSchema.get.parse(newUser);

	return newUserData;
};

const update = async (payload: any, idUser: string): Promise<iUserGet> => {
	const userRepository: iUserRepo = AppDataSource.getRepository(User);
	const userToUpdate: User | null = await userRepository.findOne({
		where: {
			id: idUser,
		},
	});

	const newUser: User[] = userRepository.create({
		...userToUpdate,
		...payload,
	});

	await userRepository.save(newUser);

	const updatedUser: iUserGet = userSchema.get.parse(newUser);

	return updatedUser;
};

const deleter = async (idUser: string): Promise<void> => {
	const userRepository: iUserRepo = AppDataSource.getRepository(User);
	const userToDelete: User | null = await userRepository.findOne({
		where: {
			id: idUser,
		},
	});

	await userRepository.softRemove(userToDelete!);
};

export default { create, update, deleter };
