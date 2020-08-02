import mongoose from 'mongoose';
import { Todo } from 'awesome-todos-types';

export type TodoDocument = mongoose.Document & Todo;

const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    unique: false,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  creationDate: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
});

const todoModel = mongoose.model<TodoDocument>('Todo', todoSchema);

export default todoModel;
