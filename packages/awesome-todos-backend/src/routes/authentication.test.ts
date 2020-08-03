import supertest from 'supertest';
import mongoose from 'mongoose';

import app, { server } from '../../server';
import db from '../models';

const MOCKED_USER_DATA = {
  userName: 'pdcc',
  email: 'p@awesome-todos.com',
  password: '123qwe',
  creationDate: new Date().toISOString(),
};

const userExists = (userName: string): Promise<boolean> => db.User.exists({ userName });
const createMockedUser = async (): Promise<void> => {
  await supertest(app).post('/signUp').send(MOCKED_USER_DATA);
  return;
};

describe('Authentication Endpoints', () => {
  afterEach(async () => {
    if (mongoose.connection.db) {
      await mongoose.connection.db.dropDatabase();
    }
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('/signUp', () => {
    it('should signUp', async (done) => {
      const response = await supertest(app).post('/signUp').send(MOCKED_USER_DATA);
      expect(response.status).toEqual(200);
      const userCreatedInDb = await userExists(MOCKED_USER_DATA.userName);
      expect(userCreatedInDb).toBeTruthy();
      await server.close(done);
    });
    it('signUp should fail if email is missing', async () => {
      const response = await supertest(app)
        .post('/signUp')
        .send({ ...MOCKED_USER_DATA, email: undefined });
      expect(response.status).toEqual(400);
      const userCreatedInDb = await userExists(MOCKED_USER_DATA.userName);
      expect(userCreatedInDb).toBeFalsy();
    });
    it('signUp should fail if userName is missing', async () => {
      const response = await supertest(app)
        .post('/signUp')
        .send({ ...MOCKED_USER_DATA, userName: undefined });
      expect(response.status).toEqual(400);
      const userCreatedInDb = await userExists(MOCKED_USER_DATA.userName);
      expect(userCreatedInDb).toBeFalsy();
    });
    it('signUp should fail if password is missing', async () => {
      const response = await supertest(app)
        .post('/signUp')
        .send({ ...MOCKED_USER_DATA, password: undefined });
      expect(response.status).toEqual(400);
      const userCreatedInDb = await userExists(MOCKED_USER_DATA.userName);
      expect(userCreatedInDb).toBeFalsy();
    });
    it('signUp should fail if creationDate is missing', async () => {
      const response = await supertest(app)
        .post('/signUp')
        .send({ ...MOCKED_USER_DATA, creationDate: undefined });
      expect(response.status).toEqual(400);
      const userCreatedInDb = await userExists(MOCKED_USER_DATA.userName);
      expect(userCreatedInDb).toBeFalsy();
    });
  });

  describe('/signIn', () => {
    it('should signIn', async () => {
      await createMockedUser();
      const response = await supertest(app)
        .post('/signIn')
        .send({ userName: MOCKED_USER_DATA.userName, password: MOCKED_USER_DATA.password });
      expect(response.status).toEqual(200);
      expect(response.body).toHaveProperty('userName', MOCKED_USER_DATA.userName);
      expect(response.body).toHaveProperty('email', MOCKED_USER_DATA.email);
    });
    it('signIn should fail if userName is missing', async () => {
      await createMockedUser();
      const response = await supertest(app)
        .post('/signIn')
        .send({ userName: undefined, password: MOCKED_USER_DATA.password });
      expect(response.status).toEqual(401);
    });
    it('signIn should fail if password is missing', async () => {
      await createMockedUser();
      const response = await supertest(app)
        .post('/signIn')
        .send({ userName: MOCKED_USER_DATA.userName, password: undefined });
      expect(response.status).toEqual(401);
    });
  });
});
