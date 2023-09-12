import { AppDataSource } from '../data-source';
import { User } from '../entities';
import { iMessageUserResponse } from '../interfaces/responses.interface';
import { iUserGet, iUserPost, iUserRepo } from '../interfaces/user.interface';
import { userSchema } from '../schemas';

const create = async (payload: iUserPost): Promise<iUserGet> => {
	const userRepository: iUserRepo = AppDataSource.getRepository(User);
	let newUser: User = userRepository.create(payload);

	await userRepository.save(newUser);

	const newUserData: iUserGet = userSchema.get.parse(newUser);

	return newUserData;
};

const readAll = async (): Promise<iUserGet[]> => {
	const userRepository: iUserRepo = AppDataSource.getRepository(User);

	const allUsers: User[] = await userRepository.find();

	return allUsers;
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

const deleter = async (
	idUser: string
): Promise<iMessageUserResponse | null> => {
	const userRepository: iUserRepo = AppDataSource.getRepository(User);
	const userToDelete: User | null = await userRepository.findOne({
		where: {
			id: idUser,
		},
		withDeleted: true,
	});

	if (!userToDelete!.deletedAt) {
		await userRepository.softRemove(userToDelete!);
		return null;
	} else {
		await userRepository.recover(userToDelete!);
		return { message: 'User successfully recovered', user: userToDelete! };
	}
};

const changeStaff = async (idUser: string): Promise<iMessageUserResponse> => {
	const userRepository: iUserRepo = AppDataSource.getRepository(User);
	const userToUpdate: User | null = await userRepository.findOne({
		where: {
			id: idUser,
		},
	});

	const newUser: User = userRepository.create({
		...userToUpdate,
		is_staff: !userToUpdate!.is_staff,
	});

	await userRepository.save(newUser);

	const updatedUser: iUserGet = userSchema.get.parse(newUser);

	const responseMessage: string = userToUpdate?.is_staff
		? 'Staff status removed'
		: 'Staff status granted';

	return { message: responseMessage, user: updatedUser };
};

export default { create, readAll, update, deleter, changeStaff };
