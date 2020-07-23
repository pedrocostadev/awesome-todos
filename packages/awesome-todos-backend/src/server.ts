import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

import todoRoutes from './routes/todo';
import authenticationRoutes from './routes/authentication';
import { verifyJWT } from './routes/utils';

const app = express();

const corsOrigin = [];

if (process.env.NODE_ENV === 'dev') {
  corsOrigin.push('http://192.168.1.104:3000');
  corsOrigin.push('http://localhost:3000');
}

app.use(
  cors({
    credentials: true,
    origin: corsOrigin,
  }),
);

app.use(bodyParser.json());

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', authenticationRoutes);

app.use('/todos', verifyJWT);

app.use('/', todoRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
