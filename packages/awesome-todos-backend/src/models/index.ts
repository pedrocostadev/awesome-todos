import mongoose from 'mongoose';
import todoModel from './todo';

mongoose.connect('mongodb://localhost/todo-app', {
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.set('debug', true);
mongoose.Promise = Promise; // setting mongoose's Promise to use Node's Promise

export default {
  Todo: todoModel,
};
