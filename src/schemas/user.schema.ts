import { z } from 'zod';

const post = z.object({
	cpf: z.string().min(11).max(14),
	first_name: z.string().max(50),
	last_name: z.string().max(50),
	email: z.string().email().max(150),
	password: z.string().max(120),
	date_birth: z.string().or(z.date()),
});

const get = post
	.extend({
		id: z.string().uuid(),
		is_staff: z.boolean(),
		createdAt: z.string().or(z.date()),
		updatedAt: z.string().or(z.date()).nullable(),
		deletedAt: z.string().or(z.date()).nullable(),
	})
	.omit({
		password: true,
	});

const patch = post
	.omit({
		cpf: true,
	})
	.partial();

export default { post, get, patch };
