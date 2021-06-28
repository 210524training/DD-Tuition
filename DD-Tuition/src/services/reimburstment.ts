/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import { DocumentClient } from '../../node_modules/aws-sdk/clients/dynamodb';
import dynamo from '../dynamo/dynamo';
import log from '../log';
import REvent, {status} from '../models/event';
import EventRepo from '../repo/carRepo';

class EventService {
  constructor(
        public doc = EventRepo,
  ) {}

  public async getByUserName(username: string): Promise<REvent[]> {
    const list = await this.doc.getByUserName(username);
    return list;
  }

  async newReimbursement(event:REvent): Promise<boolean> {
    return this.doc.newReimbursement(event);
  }

  public async getByStatus(rStatus: status): Promise<REvent[]> {
    return this.doc.getByStatus(rStatus);
  }

  async updateStatus(event: REvent): Promise<boolean> {
    return this.doc.update(event);
  }

  async queryByRid(rid: string): Promise<REvent | undefined> {
    return this.doc.queryByRid(rid);
  }

  async removeEvent(rid: string): Promise<boolean> {
    return this.doc.removeEvent(rid);
  }

  async getAllEvents(): Promise<REvent[]> {
    return this.doc.getAllEvents();
  }
}
export default new EventService();
