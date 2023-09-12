import { NextFunction, Request, Response } from 'express';
import { iReservationGet } from '../interfaces/reservation.interface';
import { reservationService } from '../services';

const create = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<Response> => {
	await reservationService.create(req.body, req.user.id);
	return res.status(200).send();
};

export default { create };
