import { Request, Response } from 'express';
import { iUserGet } from '../interfaces/user.interface';
import { userService } from '../services';

const create = async (req: Request, res: Response): Promise<Response> => {
	const newUser: iUserGet = await userService.create(req.body);
	return res.status(201).json(newUser);
};

const update = async (req: Request, res: Response): Promise<Response> => {
	const updatedUser: iUserGet = await userService.update(
		req.body,
		req.params.userID
	);
	return res.status(200).json(updatedUser);
};

const deleter = async (req: Request, res: Response): Promise<Response> => {
	await userService.deleter(req.params.userID);
	return res.status(204).send();
};

export default { create, update, deleter };
