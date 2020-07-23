import mongoose from 'mongoose';

import todoModel from './todo';
import userModel from './user';

const connectionString = process.env.MONGO_CONNECTION_STRING || 'localhost/awesome-todo-app';

mongoose.connect(`mongodb://${connectionString}`, {
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

if (process.env.NODE_ENV === 'dev') {
  mongoose.set('debug', true);
}

mongoose.Promise = Promise; // setting mongoose's Promise to use Node's Promise

export default {
  Todo: todoModel,
  User: userModel,
};
