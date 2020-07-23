import express from 'express';
import jwt from 'jsonwebtoken';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const success = (res: express.Response, payload) => res.status(200).json(payload);

export const verifyJWT = (req: express.Request, res: express.Response, next): express.Response => {
  const token = req.cookies['x-access-token'];
  if (!token) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  const bearer = (token as string).split(' ');
  const bearerToken = bearer[1];

  try {
    const jwtPayload = jwt.verify(bearerToken, process.env.SECRET);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    res.status(401).send();
    return;
  }

  next();
};
