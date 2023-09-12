import { Request, Response } from 'express';
import { iTableGet } from '../interfaces/table.interface';
import { tableService } from '../services';

const create = async (req: Request, res: Response): Promise<Response> => {
	const newTable: iTableGet = await tableService.create(
		req.body,
		req.user.id
	);
	return res.status(201).json(newTable);
};

const readAll = async (req: Request, res: Response): Promise<Response> => {
	const allTables: iTableGet[] = await tableService.readAll();
	return res.status(200).json(allTables);
};

const update = async (req: Request, res: Response): Promise<Response> => {
	const updatedTable: iTableGet = await tableService.update(
		req.body,
		req.params.tableID
	);
	return res.status(200).json(updatedTable);
};

const deleter = async (req: Request, res: Response): Promise<Response> => {
	await tableService.deleter(req.params.tableID);
	return res.status(204).send();
};

export default { create, readAll, update, deleter };
