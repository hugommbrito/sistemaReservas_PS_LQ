import { Request, Response } from 'express';
import { iUserGet } from '../interfaces/user.interface';
import { userService } from '../services';
import { iMessageUserResponse } from '../interfaces/responses.interface';

const create = async (req: Request, res: Response): Promise<Response> => {
	const newUser: iUserGet = await userService.create(req.body);
	return res.status(201).json(newUser);
};

const readAll = async (req: Request, res: Response): Promise<Response> => {
	const allUsers: iUserGet[] = await userService.readAll();
	return res.status(200).json(allUsers);
};

const update = async (req: Request, res: Response): Promise<Response> => {
	const updatedUser: iUserGet = await userService.update(
		req.body,
		req.params.userID
	);
	return res.status(200).json(updatedUser);
};

const deleter = async (req: Request, res: Response): Promise<Response> => {
	const message: null | iMessageUserResponse = await userService.deleter(
		req.params.userID
	);

	return !message ? res.status(204).send() : res.status(201).json(message);
};

const changeStaff = async (req: Request, res: Response): Promise<Response> => {
	const updatedUser: iMessageUserResponse = await userService.changeStaff(
		req.params.userID
	);
	return res.status(200).json(updatedUser);
};

export default { create, readAll, update, deleter, changeStaff };
