import { z } from 'zod';
import tableSchema from './table.schema';
import userSchema from './user.schema';

const post = z.object({
	schedule: z.string().or(z.date()),
	tableId: z.string().uuid(),
});

const request = post
	.omit({
		tableId: true,
	})
	.extend({
		table: tableSchema.get,
		created_by: userSchema.get,
		is_accepted: z.boolean().optional().default(false),
		accepted_by: z.null().or(userSchema.get),
	});

const get = request.extend({
	id: z.string().uuid(),
	createdAt: z.string().or(z.date()),
	updatedAt: z.string().or(z.date()).nullable(),
	deletedAt: z.string().or(z.date()).nullable(),
});

export default { post, request, get };
