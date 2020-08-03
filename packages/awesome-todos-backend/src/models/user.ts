import mongoose from 'mongoose';
import { User } from 'awesome-todos-types';

export type UserDocument = mongoose.Document & User;

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
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
