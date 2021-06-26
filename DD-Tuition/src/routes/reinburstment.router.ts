import express, { Router } from 'express';
import REvent, { eventType, gradingformat, status } from '../models/event';
import EventRepo from '../repo/carRepo';

const reinburstmentRouter = Router();

reinburstmentRouter.get('/', async (req, res) => {
  // TODO: Implement the GET all restaurants endpoint
  res.json(EventRepo.getAllEvents());
});

reinburstmentRouter.get('/:rid', async (req, res) => {
  // TODO: Implement the GET restaurant by ID endpoint
  const { rid } = req.body;
  res.json(EventRepo.queryByRid(rid));
});
// express.Request<unknown, unknown, { date:string,
//   time:number,
//   location:string,
//   description:string,
//   cost:number,
//   RType:eventType,
//   gf:gradingformat,
//   workrelated: string,
//   timeOff:number,
//   rStatus: status,
//   username:string, }, unknown, {}>,
reinburstmentRouter.post('/', async (req, res) => {
  // TODO: Implement the Update restaurant endpoint
  const {
    date,
    time,
    location,
    description,
    cost,
    RType,
    gf,
    workrelated,
    timeOff,
    rStatus,
    username,
  } = req.body;
  console.log(date,
    time,
    location,
    description,
    cost,
    RType,
    gf,
    workrelated,
    timeOff,
    rStatus,
    username);
  const event = new REvent(new Date().toDateString(), time, location, description, cost, RType, gf, workrelated, timeOff, rStatus, username);
  res.json(EventRepo.newReimbursement(event));
});
reinburstmentRouter.put('/', async (req, res) => {
  // TODO: Implement the Update restaurant endpoint
  const {
    date,
    time,
    location,
    description,
    cost,
    RType,
    gf,
    workrelated,
    timeOff,
    rStatus,
    username,
    rid,
  } = req.body;
  const event = new REvent(new Date().toDateString(), time, location, description, cost, RType, gf, workrelated, timeOff, rStatus, username, rid);
  res.json(EventRepo.update(event));
});

reinburstmentRouter.delete('/:id', async (req, res) => {
  // TODO: Implement the Delete restaurant by ID endpoint

});
reinburstmentRouter.get('/:username', async (req, res) => {
  res.json(EventRepo.getByUserName(req.params.username));
});
export default reinburstmentRouter;
