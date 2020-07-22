import mongoose from 'mongoose';
import { User } from 'awesome-todos-types';

type UserDocument = mongoose.Document & User;

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  creationDate: {
    type: String,
    required: true,
  },
});

const todoModel = mongoose.model<UserDocument>('User', userSchema);

export default todoModel;
