/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import { DocumentClient } from '../../node_modules/aws-sdk/clients/dynamodb';
import dynamo from '../dynamo/dynamo';
import log from '../log';
import Employee from '../models/employee';
import userService from '../services/userService';

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
      ReturnValues: 'UPDATED_NEW',
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

  async addPendingAmount(employee: Employee):Promise<boolean> {
    const params: DocumentClient.PutItemInput = {
      TableName: 'users',
      Item: {
        username: employee.username,
        password: employee.password,
        PendingReimburstments: employee.PendingReimburstments,
      },
    };
    log.debug(params);

    const response = await this.docClient.put(params).promise();
    if(response) {
      return true;
    }
    return false;
  }

  async addAwardedAmount(employee: Employee):Promise<boolean> {
    log.debug(employee);
    const params: DocumentClient.UpdateItemInput = {
      TableName: 'users',
      Key: {
        username: employee.username,
      },
      UpdateExpression: 'SET currenctBalance=:d',
      ExpressionAttributeValues: { ':d': employee.currentBalance },
    };
    log.debug(params);

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

  async queryUser(user: string): Promise<Employee | undefined> {
    log.debug(user);

    const params: DocumentClient.GetItemInput = {
      TableName: 'users',
      Key: { username: user },
      ProjectionExpression: 'username,password,#role,PendingReimburstments,currentBalance',
      ExpressionAttributeNames:{'#role':'role'}
    };
    const result = await this.docClient.get(params).promise();
    return result.Item as Employee | undefined;
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
