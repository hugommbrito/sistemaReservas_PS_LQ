import 'express-async-errors';
import express, { Application } from 'express';
import { authRouter } from './routers/auth.routes';
import { handleErrors } from './error';
import { userRouter } from './routers/user.routes';

const app: Application = express();
app.use(express.json());

app.use('/login', authRouter);
app.use('/user', userRouter);

app.use(handleErrors);

export default app;
