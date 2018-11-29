import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { APIGatewayEvent } from 'aws-lambda';

const docClient = new DocumentClient();
const _params = { TableName: 'SampleUser' };

export async function handler(event: APIGatewayEvent) {
  return {
    statusCode: 200,
    body: 'Hello Lambda!',
  };
}
