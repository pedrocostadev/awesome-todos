import mongoose from 'mongoose';

import todoModel from './todo';
import userModel from './user';

const connectionString = process.env.MONGODB_URI || 'localhost/awesome-todo-app';

mongoose.connect(`mongodb://${connectionString}`, {
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

mongoose.Promise = Promise; // setting mongoose's Promise to use Node's Promise

export default {
  Todo: todoModel,
  User: userModel,
};
