import mongoose from 'mongoose';

import todoModel from './todo';
import userModel from './user';

mongoose.connect(`mongodb://${process.env.MONGO_CONNECTION_STRING}`, {
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
