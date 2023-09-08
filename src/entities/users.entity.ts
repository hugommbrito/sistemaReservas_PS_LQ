import { getRounds, hashSync } from 'bcryptjs';
import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Table } from './tables.entity';
import { Reservation } from './reservations.entity';

@Entity('users')
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'varchar', length: 14, unique: true })
	cpf: string;

	@Column({ type: 'varchar', length: 50 })
	first_name: string;

	@Column({ type: 'varchar', length: 50 })
	last_name: string;

	@Column({ type: 'varchar', length: 150, unique: true })
	email: string;

	@Column({ type: 'varchar', length: 120 })
	password: string;

	@Column({ type: 'boolean', default: false })
	is_staff: boolean;

	@Column({ type: 'date' })
	date_birth: string | Date;

	@CreateDateColumn({ type: 'date' })
	createdAt: string;

	@UpdateDateColumn({ type: 'date' })
	updatedAt: string;

	@DeleteDateColumn({ type: 'date' })
	deletedAt: string;

	@OneToMany(() => Table, (table) => table.created_by)
	tables_created: Table[];

	@OneToMany(() => Reservation, (reservation) => reservation.created_by)
	reservations_created: Reservation[];

	@OneToMany(() => Reservation, (reservation) => reservation.accepted_by)
	reservations_accepted: Reservation[];

	@BeforeInsert()
	@BeforeUpdate()
	hashPassword() {
		const isEncripted = getRounds(this.password);
		if (!isEncripted) {
			this.password = hashSync(this.password, 10);
		}
	}
}
