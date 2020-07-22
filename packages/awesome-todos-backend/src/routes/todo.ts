import express from 'express';
import { success } from './utils';
import db from '../models';

const router = express.Router();

router.get('/todos', async (req, res, next) => {
  try {
    const todos = await db.Todo.find({});
    return success(res, todos);
  } catch (err) {
    next({ status: 400, message: 'failed to get todos' });
  }
});

router.post('/todos', async (req, res, next) => {
  try {
    const todo = await db.Todo.create(req.body);
    return success(res, todo);
  } catch (err) {
    next({ status: 400, message: 'failed to create todo' });
  }
});

router.put('/todos/:id', async (req, res, next) => {
  try {
    const todo = await db.Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return success(res, todo);
  } catch (err) {
    next({ status: 400, message: 'failed to update todo' });
  }
});
router.delete('/todos/:id', async (req, res, next) => {
  try {
    await db.Todo.findByIdAndRemove(req.params.id);
    return success(res, 'todo deleted!');
  } catch (err) {
    next({ status: 400, message: 'failed to delete todo' });
  }
});

export default router;
