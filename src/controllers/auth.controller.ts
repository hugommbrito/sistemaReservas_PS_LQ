import { Request, Response } from 'express';
import { iAuthToken } from '../interfaces/auth.interface';
import { authService } from '../services';

const login = async (req: Request, res: Response): Promise<Response> => {
	const token: iAuthToken = await authService.login(req.body);

	return res.status(200).json(token);
};

export default { login };
