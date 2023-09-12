import * as express from 'express';

declare global {
	namespace Express {
		interface Request {
			user: {
				id: string;
				isStaff: boolean;
				deletedAt: Date | string | null;
			};
		}
	}
}
