import auth from './authRouter.js';
import user from './userRouter.js';
import product from './productRouter.js';
import frete from './freteRouter.js';
import express from 'express';

const app = express.Router();

app.use(auth);
app.use(user);
app.use(frete);
app.use(product);

export default app;