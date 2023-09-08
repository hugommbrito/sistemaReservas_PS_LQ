import { z } from 'zod';
import { authSchema } from '../schemas';

export type iAuthLogin = z.infer<typeof authSchema.login>;
export type iAuthToken = z.infer<typeof authSchema.token>;
