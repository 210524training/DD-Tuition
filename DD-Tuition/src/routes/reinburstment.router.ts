import express, { Router } from 'express';
import Employee from '../models/employee';
import REvent, { eventType, gradingformat, status } from '../models/event';
import EventRepo from '../repo/carRepo';
import EventService from '../services/reimburstment';

const reinburstmentRouter = Router();
reinburstmentRouter.post('/pendingrequests', async (req, res) => {
  if(req.session.user) {
    switch (req.session.user?.role) {
    case 'Department Head':
      res.json(await EventService.getByStatus('Pending Department Head'));
      break;
    default:
      res.json(await EventService.getByUserName(req.session.user.username));
      break;
    }
  }
});

// reinburstmentRouter.get('/:rid', async (req, res) => {
//   // TODO: Implement the GET restaurant by ID endpoint
//   const { rid } = req.body;
//   res.json(EventRepo.queryByRid(rid));
// });
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
reinburstmentRouter.put('/updateRequest', async (req, res) => {
  // TODO: Implement the Update restaurant endpoint
  
  const event = req.body;
  res.json(await EventRepo.update(event));
});

reinburstmentRouter.delete('/:id', async (req, res) => {
  // TODO: Implement the Delete restaurant by ID endpoint

});

export default reinburstmentRouter;
