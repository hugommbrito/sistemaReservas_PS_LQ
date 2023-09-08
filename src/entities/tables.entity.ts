import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { User } from './users.entity';
import { Reservation } from './reservations.entity';

@Entity('tables')
export class Table {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'int' })
	number: number;

	@Column({ type: 'int' })
	seats: number;

	@CreateDateColumn({ type: 'date' })
	createdAt: string;

	@UpdateDateColumn({ type: 'date' })
	updatedAt: string;

	@DeleteDateColumn({ type: 'date' })
	deletedAt: string;

	@ManyToOne(() => User, (user) => user.tables_created)
	created_by: User;

	@OneToMany(() => Reservation, (reservation) => reservation.table)
	reservations: Reservation[];
}
