import { z } from 'zod';
import { tableSchema } from '../schemas';
import { Repository } from 'typeorm';
import { Table } from '../entities';

export type iTablePost = z.infer<typeof tableSchema.post>;
export type iTableRequest = z.infer<typeof tableSchema.request>;
export type iTableGet = z.infer<typeof tableSchema.get>;
export type iTablePatch = z.infer<typeof tableSchema.patch>;

export type iTableRepo = Repository<Table>;
