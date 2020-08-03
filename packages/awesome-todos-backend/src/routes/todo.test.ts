import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import mongoose, { DocumentQuery } from 'mongoose';
import { ApiTodo } from 'awesome-todos-types';

import app, { server } from '../../server';
import db from '../models';
import { TodoDocument } from '../models/todo';

const MOCKED_USER_ID = '123';
const MOCKED_JWT = jwt.sign({ id: MOCKED_USER_ID }, process.env.SECRET, { expiresIn: '1d' });
const MOCKED_TODO_DATA = {
  task: 'task',
  completed: false,
  creationDate: new Date().toISOString(),
};

const todoExists = (_id: string): Promise<boolean> => db.Todo.exists({ _id });
const getTodoById = (_id: string): DocumentQuery<ApiTodo, TodoDocument> => db.Todo.findById(_id);

const createNewTodoOnDb = async (): Promise<ApiTodo> => {
  const response = await supertest(app)
    .post('/todos')
    .set('Cookie', [`x-access-token=Bearer ${MOCKED_JWT}`])
    .send(MOCKED_TODO_DATA);

  return response.body;
};

describe('Todo Endpoints', () => {
  afterEach(async () => {
    if (mongoose.connection.db) {
      await mongoose.connection.db.dropDatabase();
    }
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should return all todos', async () => {
    const newTodo1 = await createNewTodoOnDb();
    const newTodo2 = await createNewTodoOnDb();

    const reponse = await supertest(app)
      .get('/todos')
      .set('Cookie', [`x-access-token=Bearer ${MOCKED_JWT}`]);

    expect(reponse.status).toEqual(200);
    expect(reponse.body).toHaveLength(2);
    expect(reponse.body.some((todo) => todo._id === newTodo1._id));
    expect(reponse.body.some((todo) => todo._id === newTodo2._id));
  });

  it('should create a new todo', async (done) => {
    const response = await supertest(app)
      .post('/todos')
      .set('Cookie', [`x-access-token=Bearer ${MOCKED_JWT}`])
      .send(MOCKED_TODO_DATA);

    const { body: newTodo, status } = response;

    expect(status).toEqual(200);
    expect(newTodo).toHaveProperty('user', MOCKED_USER_ID);
    expect(newTodo).toHaveProperty('task', MOCKED_TODO_DATA.task);
    expect(newTodo).toHaveProperty('completed', MOCKED_TODO_DATA.completed);
    expect(newTodo).toHaveProperty('creationDate', MOCKED_TODO_DATA.creationDate);

    const newTodoExistsInDb = await todoExists(newTodo._id);
    expect(newTodoExistsInDb).toBeTruthy();

    await server.close(done);
  });

  it('should not be able to create a new todo without authentication cookie', async () => {
    const response = await supertest(app).post('/todos').send(MOCKED_TODO_DATA);

    expect(response.status).toEqual(401);
    expect(response.body).toHaveProperty('message', 'Unauthorized');
  });

  it('should delete a todo', async () => {
    const newTodo = await createNewTodoOnDb();

    const newTodoExistsInDb = await todoExists(newTodo._id);
    expect(newTodoExistsInDb).toBeTruthy();

    const deleteResponse = await supertest(app)
      .delete(`/todos/${newTodo._id}`)
      .set('Cookie', [`x-access-token=Bearer ${MOCKED_JWT}`])
      .send(MOCKED_TODO_DATA);

    expect(deleteResponse.status).toEqual(200);
    const newTodoDeletedInDb = !(await todoExists(newTodo._id));
    expect(newTodoDeletedInDb).toBeTruthy();
  });

  it('should update a todo', async () => {
    const newTodo = await createNewTodoOnDb();

    const updatedTask = 'Updated task';

    const response = await supertest(app)
      .put(`/todos/${newTodo._id}`)
      .set('Cookie', [`x-access-token=Bearer ${MOCKED_JWT}`])
      .send({ ...MOCKED_TODO_DATA, task: updatedTask });

    const { body: updatedTodo, status } = response;

    expect(status).toEqual(200);
    expect(updatedTodo).toHaveProperty('task', updatedTask);

    const updatedTodoInDb = await getTodoById(newTodo._id);
    expect(updatedTodoInDb.task).toEqual(updatedTask);
  });
});
