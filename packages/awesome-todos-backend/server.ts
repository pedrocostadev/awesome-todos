import bodyParser from 'body-parser';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config();

import todoRoutes from './src/routes/todo';
import authenticationRoutes from './src/routes/authentication';
import { verifyJWT } from './src/routes/utils';

const app = express();

// If we set cors, use credentials flag
// app.use(cors({ credentials: true }));

app.use(bodyParser.json());

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', authenticationRoutes);

app.use('/todos', verifyJWT);

app.use('/', todoRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
