import express from 'express';

export const success = (res: express.Response, payload) => res.status(200).json(payload);
