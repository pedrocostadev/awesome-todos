import express from 'express';
import jwt from 'jsonwebtoken';

import env from '../../.env.json';
import db from '../models';
import { success } from './utils';

const router = express.Router();

const SEVEN_DAYS = 1000 * 60 * 60 * 24 * 7;

router.post('/signIn', async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const [foundUser] = await db.User.find({ userName, password });

    if (!foundUser) {
      throw 'Username or password is incorrect';
    }

    const token = jwt.sign({ id: foundUser.userName }, env.secret, { expiresIn: '7d' });

    res.cookie('x-access-token', `Bearer ${token}`, {
      secure: false,
      httpOnly: true,
      maxAge: SEVEN_DAYS,
    });

    const foundUserWithToken = {
      userName: foundUser.userName,
      email: foundUser.email,
    };

    return success(res, foundUserWithToken);
  } catch (err) {
    next({ status: 401, message: 'failed to authenticate' });
  }
});

router.post('/signUp', async (req, res, next) => {
  try {
    await db.User.create(req.body);
    return success(res, {});
  } catch (err) {
    next({ status: 400, message: 'failed to create user' });
  }
});

export default router;
