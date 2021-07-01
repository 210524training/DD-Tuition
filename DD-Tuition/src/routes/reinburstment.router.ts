import express, { Router } from 'express';
import logger from '../log';
import log from '../log';
import Employee from '../models/employee';
import REvent, { eventType, gradingformat, status } from '../models/event';
import EventRepo from '../repo/carRepo';
import reimburstment from '../services/reimburstment';
import EventService from '../services/reimburstment';

const reinburstmentRouter = Router();
reinburstmentRouter.post('/pendingrequests', async (req, res) => {
  const {user,role} = req.body;
  if(role) {
    switch (role) {
    case 'Department Head':
      res.json(await EventService.getByStatus('Pending Department Head'));

      break;
    case 'Direct Supervisor': {
      res.json(await EventService.getByStatus('Pending Direct Supervisor'));
      break;
    }
    case 'BenCo': {
      res.json(await EventService.getByStatus('Pending Benefits Coordinator'));
      break;
    }
    default:
      break;
    }
  }
});
reinburstmentRouter.post('/mypendingrequests', async (req, res) => {
  if(req.session.user) {
    res.json(await EventService.getByUserName(req.session.user.username));
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
    gradingFormat,
    justification,
    timeOff,
    user,
  } = req.body;

  const event = new REvent(date, 0, location, description, cost, RType, gradingFormat, justification, 0, 'Pending Direct Supervisor', user);
  event.calcuateProjection();
  res.json(await EventRepo.newReimbursement(event));
});
reinburstmentRouter.put('/updateRequest', async (req: express.Request<unknown, unknown, { event: REvent }, unknown>, res) => {
  // TODO: Implement the Update restaurant endpoint

  const { event } = req.body;
  const result = await EventRepo.updateDetails(event);
  res.json(await EventRepo.update(event));
});
reinburstmentRouter.patch('/file', async (req: express.Request<unknown, unknown, { reimID:string, formData:string }, unknown>, res) => {
  const { reimID, formData } = req.body;
  const user = await reimburstment.queryByRid(reimID) as REvent;
  await EventRepo.update(user, formData);
});
reinburstmentRouter.delete('/:id', async (req, res) => {
  // TODO: Implement the Delete restaurant by ID endpoint
  res.json(await EventRepo.delete(req.params.id));
});

export default reinburstmentRouter;
