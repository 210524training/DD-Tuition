/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import { DocumentClient } from '../../node_modules/aws-sdk/clients/dynamodb';
import dynamo from '../dynamo/dynamo';
import log from '../log';
import REvent from '../models/event';
import CarRepo from '../repo/carRepo';

export default class UserService {
  constructor(
        private doc = CarRepo,
  ) {}

  getByUserName(username: string): Promise<REvent[]> {
    return this.doc.getByUserName(username);
  }

  async newReimbursement(event:REvent): Promise<boolean> {
    return this.doc.newReimbursement(event);
  }

  async updateStatus(event: REvent): Promise<boolean> {
    return this.doc.update(event);
  }

  async queryByRid(rid: string): Promise<REvent | undefined> {
    return this.queryByRid(rid);
  }

  async removeEvent(rid: string): Promise<boolean> {
    return this.doc.removeEvent(rid);
  }

  async getAllEvents(): Promise<REvent[]> {
    return this.doc.getAllEvents();
  }
}
