import * as AWS from 'aws-sdk';

const dynamo = new AWS.DynamoDB.DocumentClient({
  region: 'us-east-2',
  endpoint: 'https://dynamodb.us-east-2.amazonaws.com',
  apiVersion: 'latest',
});
// async function queryUser(username: string): Promise<User | undefined> {
//   const params: AWS.DynamoDB.DocumentClient.GetItemInput = {
//     TableName: 'users',
//     Key: {
//       username,
//     },
//     ProjectionExpression: 'username, #password, #role, #cars',
//     ExpressionAttributeNames: {
//       '#password': 'password',
//       '#role': 'role',
//       '#cars': 'cars',
//     },
//   };
//   const result = await dynamo.get(params).promise();
//   return result.Item as User | undefined;
// }
export const S3 = new AWS.S3({
  region: 'us-east-2',
  endpoint: 'https://s3.us-east-2.amazonaws.com',
  apiVersion: 'latest',
});
export default dynamo;
// function params(params: any) {
//   throw new Error('Function not implemented.');
// }
