import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Table } from './tables.entity';
import { User } from './users.entity';

@Entity('reservations')
export class Reservation {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'timestamp' })
	schedule: Date;

	@Column({ type: 'boolean', default: false })
	is_accepted: boolean;

	@CreateDateColumn({ type: 'date' })
	createdAt: string;

	@UpdateDateColumn({ type: 'date' })
	updatedAt: string;

	@DeleteDateColumn({ type: 'date' })
	deletedAt: string;

	@ManyToOne(() => Table, (table) => table.reservations)
	table: Table;

	@ManyToOne(() => User, (user) => user.reservations_created)
	created_by: User;

	@ManyToOne(() => User, (user) => user.reservations_accepted)
	accepted_by: User;
}
