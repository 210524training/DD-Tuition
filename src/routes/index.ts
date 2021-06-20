import express, { Router } from 'express';
import path from 'path';
import userRouter from './user.router';
import restaurantRouter from './reinburstment.router';
import Employee from '../models/employee';
import userRepo from '../repo/userRepo';
import userService from '../services/userService';
import reinburstmentRouter from './reinburstment.router';

const baseRouter = Router();

/* GET home page */
baseRouter.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/views/index.html'));
});

/* GET login page */
baseRouter.get('/login', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/views/login.html'));
});

baseRouter.get('/json', async (req, res) => {
  console.log('Our callback was invoked!');
  res.json({ data: req.session.user });

  // throw new Error('Something went wrong!');
});

baseRouter.post('/login', async (req: express.Request<unknown, unknown, { username: string, password: string }, unknown, {}>, res) => {
  const { username, password } = req.body;
  console.log(username);
  console.log(password);
  const account = new Employee(username, password);
  const user = await userService.login(account.username, account.password);
  if(user) {
    req.session.user = account;
    res.json(req.session.user);
  }

  // return res.status(400).end();
});

export async function logout(req: express.Request, res: express.Response): Promise<void> {
  if(req.session.user) {
    const { username } = req.session.user;

    req.session.destroy(() => {
      console.log(`${username} logged out`);
    });
  }
  // If they aren't logged in, we don't need to do anything

  res.status(202).send();
}

baseRouter.post('/logout', logout);

baseRouter.use('/api/v1/users', userRouter);
baseRouter.use('/api/v1/reinburstments', reinburstmentRouter);

export default baseRouter;
