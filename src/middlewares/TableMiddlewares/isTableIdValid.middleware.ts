import { NextFunction, Request, Response } from 'express';
import { iUserRepo } from '../../interfaces/user.interface';
import { AppDataSource } from '../../data-source';
import { Table } from '../../entities';
import { AppError } from '../../error';
import { iTableRepo } from '../../interfaces/table.interface';

export const isTableIdValidMdwr = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const tableRepository: iTableRepo = AppDataSource.getRepository(Table);

	const isTableExists: boolean = await tableRepository.exist({
		where: {
			id: req.params.tableID,
		},
	});

	if (!isTableExists) {
		throw new AppError('Table not found', 404);
	}

	return next();
};
