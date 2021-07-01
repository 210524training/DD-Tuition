import express, { Router } from 'express';
import log from '../log';
import Employee from '../models/employee';
import userRepo from '../repo/userRepo';
import userService from '../services/userService';
import reinburstmentRouter from './reinburstment.router';

const userRouter = Router();

userRouter.get('/', async (req, res) => {
  console.log('Reached our user router get all function');

  if(!req.session.isLoggedIn || !req.session.user) {
    throw new Error('You must be logged in to access this functionality');
  }

  // Past the above if statement, we have confirmed that the user is logged in

  // Pretend that we have some actual data
  // This is an array of just this 1 user
  // But this should instead use our DynamoDB DocumentClient to fetch data
  res.json([req.session.user]);
});

userRouter.get('/:id', async (req, res) => {
  // TODO: Implement the GET user by ID endpoint
  res.json(req.session.user);
});

userRouter.post('/', async (req: express.Request<unknown, unknown, { username: string, password: string, email: string }, unknown, {}>, res) => {
  // TODO: Implement the Create user endpoint
  const { username, password } = req.body;
  const user = new Employee(username, password);
  res.json(userService.register(user));
});

userRouter.put('/projectAmount', async (req, res) => {
  // TODO: Implement the Update user endpoint
  const { username, projectAmount } = req.body;
  log.debug(username);
  const user = await userService.findByEmployeename(username) as Employee;
  user.PendingReimburstments += projectAmount;
  res.json(userService.addPendingAmount(user));
});
userRouter.put('/addCurrentBalance', async (req: express.Request<unknown, unknown, { user: string, addCurrentBalance: number }, unknown, {}>, res) => {
  // TODO: Implement the Update user endpoint
  const { user, addCurrentBalance } = req.body;
  const bUser = await userService.findByEmployeename(user) as Employee;
  bUser.currentBalance += addCurrentBalance;
  bUser.PendingReimburstments -= addCurrentBalance;
  log.debug(bUser);
  res.json(await userService.addAwardedAmount(bUser));
});
userRouter.delete('/:id', async (req, res) => {
  // TODO: Implement the Delete user by ID endpoint
});
export default userRouter;
