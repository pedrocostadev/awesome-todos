import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import env from '../../.env.json';
import db from '../models';
import { success } from './utils';

const router = express.Router();

const ONE_DAY = 1000 * 60 * 60 * 24 * 1;

router.post('/signIn', async (req, res, next) => {
  try {
    const { userName, password, email } = req.body;
    const foundUser = await db.User.findOne({ userName });
    const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);

    if (!isPasswordCorrect) {
      throw new Error('Incorrect password');
    }

    const token = jwt.sign({ id: foundUser._id }, env.secret, { expiresIn: '1d' });

    res.cookie('x-access-token', `Bearer ${token}`, {
      secure: false, // Should be true in production
      httpOnly: true,
      maxAge: ONE_DAY,
      sameSite: 'none',
    });

    return success(res, { userName, email });
  } catch (err) {
    next({ status: 401, message: 'failed to authenticate' });
  }
});

router.post('/signUp', async (req, res, next) => {
  try {
    const passwordSalt = await bcrypt.genSalt();
    req.body.password = await bcrypt.hash(req.body.password, passwordSalt);
    await db.User.create(req.body);
    return success(res, {});
  } catch (err) {
    next({ status: 400, message: 'failed to create user' });
  }
});

export default router;
