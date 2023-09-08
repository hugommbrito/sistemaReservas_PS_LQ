import { z } from 'zod';
import { userSchema } from '../schemas';
import { Repository } from 'typeorm';
import { User } from '../entities';

export type iUserPost = z.infer<typeof userSchema.post>;
export type iUserGet = z.infer<typeof userSchema.get>;
export type iUserPatch = z.infer<typeof userSchema.patch>;

export type iUserRepo = Repository<User>;
