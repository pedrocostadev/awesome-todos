import mongoose from 'mongoose';
import { Todo } from 'awesome-todos-types';

type TodoDocument = mongoose.Document & Todo;

const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    unique: true,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const todoModel = mongoose.model<TodoDocument>('Todo', todoSchema);

export default todoModel;
