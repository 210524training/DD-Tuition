/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import { DocumentClient } from '../../node_modules/aws-sdk/clients/dynamodb';
import dynamo from '../dynamo/dynamo';
import log from '../log';
import Employee from '../models/employee';

class UserRepo {
  constructor(
        public docClient: DocumentClient = dynamo,
  ) {}

  public async getByUserName(username: string): Promise<Employee[]> {
    const params: DocumentClient.ScanInput = {
      TableName: 'users',
      FilterExpression: '#username = :username',
      ExpressionAttributeValues: {
        ':username': username,

      },
      ExpressionAttributeNames: {
        '#username': 'username',
      },
    };

    const results = await this.docClient.scan(params).promise();
    console.log(results);
    // console.log(results);
    log.debug(results);
    return results.Items as Employee[];
  }

  async newEmployee(employee:Employee): Promise<boolean> {
    const params: DocumentClient.PutItemInput = {
      TableName: 'users',
      Item: {
        username: employee.username,
        password: employee.password,
        role: employee.role,
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

  async updateStatus(employee: Employee):Promise<boolean> {
    const params: DocumentClient.UpdateItemInput = {
      TableName: 'reinbursments',
      Key: {
        username: employee.username,
      },
      ReturnConsumedCapacity: 'TOTAL',
      UpdateExpression: 'SET #status = :s AND #username = :u',
      ExpressionAttributeValues: {
        ':u': employee.username,
      },
      ExpressionAttributeNames: {
        '#status': 'status',
        '#username': 'owner',
      },
      ReturnValues: 'UPDATED_NEW',
    };
    const response = await this.docClient.update(params).promise();
    if(response) {
      return true;
    }
    return false;
  }

  async queryByRid(rid: string): Promise<Employee | undefined> {
    const params: DocumentClient.GetItemInput = {
      TableName: 'reinbursments',
      Key: { rid },

    };
    const result = await this.docClient.get(params).promise();
    console.log(result);
    return result as Employee | undefined;
  }

  async queryUser(username: string): Promise<Employee | undefined> {
    const params: DocumentClient.GetItemInput = {
      TableName: 'users',
      Key: { username },

    };
    const result = await this.docClient.get(params).promise();
    console.log(result);
    return result.Item as Employee| undefined;
  }

  async removeemployee(rid: string): Promise<boolean> {
    const params: DocumentClient.GetItemInput = {
      TableName: 'reinburstments',
      Key: { rid },

    };
    const result = (await this.docClient.delete(params).promise());
    console.log(result);
    log.debug(result);
    return true;
  }

  async getAllemployees(): Promise<Employee[]> {
    const params: DocumentClient.ScanInput = {
      TableName: 'reinburstments',
    };

    const results = await this.docClient.scan(params).promise();
    // console.log(results);
    log.debug(results);
    if(results.Items) {
      return results.Items as Employee[];
    }
    return [];
  }
}
export default new UserRepo();
