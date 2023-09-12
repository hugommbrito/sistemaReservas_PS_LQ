import { AppDataSource } from '../data-source';
import { Table, User } from '../entities';
import {
	iTableGet,
	iTablePatch,
	iTablePost,
	iTableRepo,
	iTableRequest,
} from '../interfaces/table.interface';
import { iUserGet, iUserPost, iUserRepo } from '../interfaces/user.interface';
import { tableSchema, userSchema } from '../schemas';

const create = async (
	payload: iTablePost,
	loggedUserID: string
): Promise<iTableGet> => {
	const tableRepository: iTableRepo = AppDataSource.getRepository(Table);
	const userRepository: iUserRepo = AppDataSource.getRepository(User);

	let loggedUser: User | null | iUserPost = await userRepository.findOne({
		where: {
			id: loggedUserID,
		},
	});

	const tableData: iTableRequest = {
		...payload,
		created_by: loggedUser!,
	};

	let newTable: Table = tableRepository.create(tableData);

	await tableRepository.save(newTable);

	const newTableData: iTableGet = tableSchema.get.parse(newTable);

	return newTableData;
};

const readAll = async (): Promise<iTableGet[]> => {
	const tableRepository: iTableRepo = AppDataSource.getRepository(Table);

	const allTables: Table[] = await tableRepository.find();

	return allTables;
};

const update = async (
	payload: iTablePost,
	idTable: string
): Promise<iTableGet> => {
	const tableRepository: iTableRepo = AppDataSource.getRepository(Table);

	const tableToUpdate: Table | null = await tableRepository.findOne({
		where: {
			id: idTable,
		},
		relations: ['created_by'],
	});
	console.log(tableToUpdate);

	const newTable: Table = tableRepository.create({
		...tableToUpdate,
		...payload,
	});

	await tableRepository.save(newTable);

	const updatedTable: iTableGet = tableSchema.get.parse(newTable);

	return updatedTable;
};

const deleter = async (idTable: string): Promise<void> => {
	const tableRepository: iTableRepo = AppDataSource.getRepository(Table);

	const allTables: Table | null = await tableRepository.findOne({
		where: {
			id: idTable,
		},
	});

	await tableRepository.softRemove(allTables!);
};

export default { create, readAll, update, deleter };
