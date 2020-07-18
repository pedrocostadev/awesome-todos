import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import todosRoutes from './routes/todos';

const app = express();

const corsOptions = {
  origin: 'http://192.168.1.104:3000',
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', todosRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// https://www.devsurvival.com/todo-app-react-backend/
