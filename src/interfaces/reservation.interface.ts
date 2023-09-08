import { z } from 'zod';
import { reservationSchema } from '../schemas';
import { Repository } from 'typeorm';
import { Reservation } from '../entities';

export type iReservationPost = z.infer<typeof reservationSchema.post>;
export type iReservationRequest = z.infer<typeof reservationSchema.request>;
export type iReservationGet = z.infer<typeof reservationSchema.get>;

export type iReservationRepo = Repository<Reservation>;
