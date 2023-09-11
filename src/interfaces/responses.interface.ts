import { iUserGet } from './user.interface';

export interface iMessageResponse {
	message: string;
}

export interface iMessageUserResponse extends iMessageResponse {
	user: iUserGet;
}
