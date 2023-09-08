import app from './app';
import { AppDataSource } from './data-source';
import 'dotenv/config';

AppDataSource.initialize()
	.then(async () => {
		console.log('Database connected');

		const PORT: number = parseInt(process.env.PORT!) || 3000;
		const serverMsg: string = `Server running on port ${PORT}`;

		app.listen(PORT, () => console.log(serverMsg));
	})
	.catch((err) => {
		console.log(err);
	});
