import { Request } from 'express';
import {
	iReservationGet,
	iReservationPost,
	iReservationRepo,
	iReservationRequest,
} from '../interfaces/reservation.interface';
import { AppDataSource } from '../data-source';
import { Reservation, Table, User } from '../entities';
import { iUserGet, iUserPost, iUserRepo } from '../interfaces/user.interface';
import {
	iTableGet,
	iTablePost,
	iTableRepo,
} from '../interfaces/table.interface';

const create = async (
	payload: iReservationPost,
	loggedUserID: string
): Promise<iReservationGet | void> => {
	const reservationRepository: iReservationRepo =
		AppDataSource.getRepository(Reservation);
	const userRepository: iUserRepo = AppDataSource.getRepository(User);
	const tableRepository: iTableRepo = AppDataSource.getRepository(Table);

	let loggedUser: User | null = await userRepository.findOne({
		where: {
			id: loggedUserID,
		},
	});

	console.log(loggedUser);

	const selectedTable: Table | null = await tableRepository.findOne({
		where: {
			id: payload.tableId,
		},
	});
	console.log(selectedTable);

	if (!loggedUser || !selectedTable) {
		throw new Error('User or table not found');
	}

	const reservationData: iReservationRequest = {
		schedule: payload.schedule,
		created_by: loggedUser!,
		table: selectedTable!,
		is_accepted: false,
		accepted_by: null,
	};

	console.log(reservationData);

	const newReservation: Reservation =
		reservationRepository.create(reservationData);

	// await reservationRepository.save(newReservation);
};

export default { create };
