import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import todoRoutes from './routes/todo';
import authenticationRoutes from './routes/authentication';
import { verifyJWT } from './routes/utils';
import cookieParser from 'cookie-parser';

const app = express();

const corsOptions = {
  origin: 'http://192.168.1.104:3000',
  credentials: true,
};

app.use(cors(corsOptions));

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
