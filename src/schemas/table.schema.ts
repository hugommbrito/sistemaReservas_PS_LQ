import { z } from 'zod';
import userSchema from './user.schema';

const post = z.object({
	number: z.number().int(),
	seats: z.number().int(),
});

const request = post.extend({
	created_by: userSchema.get,
});

const get = request.extend({
	id: z.string().uuid(),
	createdAt: z.string().or(z.date()),
	updatedAt: z.string().or(z.date()).nullable(),
	deletedAt: z.string().or(z.date()).nullable(),
});

const patch = post.partial();

export default { post, request, get, patch };
