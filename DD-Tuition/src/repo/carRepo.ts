/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import { DocumentClient } from '../../node_modules/aws-sdk/clients/dynamodb';
import dynamo from '../dynamo/dynamo';
import log from '../log';
import REvent from '../models/event';

class EventRepo {
  constructor(
        public docClient: DocumentClient = dynamo,
  ) {}

  public async getByUserName(username: string): Promise<REvent[]> {
    const params: DocumentClient.ScanInput = {
      TableName: 'reinburstments',
      FilterExpression: 'username = :username',
      ExpressionAttributeValues: {
        ':username': username,

      },
    };

    const results = await this.docClient.scan(params).promise();
    log.debug(results);
    console.log(results);
    // console.log(results);
    log.debug(results);
    return results.Items as REvent[];
  }

  async newReimbursement(event:REvent): Promise<boolean> {
    console.log(event);
    const params: DocumentClient.PutItemInput = {
      TableName: 'reinburstments',
      Item: {
        rid: event.getID,
        date: event.date,
        time: event.time,
        location: event.location,
        description: event.description,
        cost: event.cost,
        eventType: event.eventType,
        status: event.status,
        gradingformat: event.gradingformat,
        workrelated: event.workrelated,
        timeOff: event.timeOff,
      },
      ReturnConsumedCapacity: 'TOTAL',
    };
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const result = await this.docClient.put(params).promise();
      log.debug(result);
      return true;
    } catch(err) {
      return false;
    }
  }

  async update(event: REvent): Promise<boolean> {
    const params: DocumentClient.PutItemInput = {
      TableName: 'reinburstments',
      Item: { ...event },
      ConditionExpression: 'rid = :rid',
      ExpressionAttributeValues: {
        ':rid': event.getID,
      },
    };

    try {
      await this.docClient.put(params).promise();

      return true;
    } catch(error) {
      console.log('Failed to update Restaurant: ', error);
      return false;
    }
  }

  async delete(id: string): Promise<boolean> {
    const params: DocumentClient.DeleteItemInput = {
      TableName: 'Grubdash',
      Key: {
        category: 'Restaurant',
        id,
      },
    };

    try {
      await this.docClient.delete(params).promise();

      return true;
    } catch(error) {
      console.log('Failed to delete Restaurant: ', error);
      return false;
    }
  }

  async queryByRid(rid: string): Promise<REvent | undefined> {
    const params: DocumentClient.GetItemInput = {
      TableName: 'reinbursments',
      Key: { rid },

    };
    const result = await this.docClient.get(params).promise();
    console.log(result);
    return result as REvent | undefined;
  }

  async removeEvent(rid: string): Promise<boolean> {
    const params: DocumentClient.GetItemInput = {
      TableName: 'reinburstments',
      Key: { rid },

    };
    const result = (await this.docClient.delete(params).promise());
    console.log(result);
    log.debug(result);
    return true;
  }

  async getAllEvents(): Promise<REvent[]> {
    const params: DocumentClient.ScanInput = {
      TableName: 'reinburstments',
    };

    const results = await this.docClient.scan(params).promise();
    // console.log(results);
    log.debug(results);
    if(results.Items) {
      return results.Items as REvent[];
    }
    return [];
  }
}
export default new EventRepo();
