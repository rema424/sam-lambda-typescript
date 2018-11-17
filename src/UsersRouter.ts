import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export async function run(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  console.log('event.httpMethod', event.httpMethod);
  console.log('event.body', event.body);
  const id: string = (event.pathParameters || {}).userId || '';
  switch (event.httpMethod) {
    case 'GET':
      if (id) {
        return getUser(event);
      }
      return listUsers(event);
    case 'POST':
      return createUser(event);
    case 'PUT':
      return updateUser(event);
    case 'DELETE':
      return deleteUser(event);
    default:
      // Send HTTP 501: Not Implemented
      console.log('Error: unsupported HTTP method (' + event.httpMethod + ')');
      return {
        statusCode: 501,
        headers: { my_header: 'my_value' },
        body: JSON.stringify({}),
      };
  }
}

async function getUser(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  const response: APIGatewayProxyResult = {
    statusCode: 200,
    headers: { my_header: 'my_value' },
    body: JSON.stringify({
      resource: event.resource,
      body: JSON.parse(event.body || '{}'),
      method: event.httpMethod,
      pathParameters: event.pathParameters,
      message: `Get a user ID: ${(event.pathParameters || {}).userId || false}`,
    }),
  };
  return response;
}

async function listUsers(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  const response: APIGatewayProxyResult = {
    statusCode: 200,
    headers: { my_header: 'my_value' },
    body: JSON.stringify({
      resource: event.resource,
      body: JSON.parse(event.body || '{}'),
      method: event.httpMethod,
      pathParameters: event.pathParameters,
      message: `List users.`,
    }),
  };
  return response;
}

async function createUser(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  const response: APIGatewayProxyResult = {
    statusCode: 200,
    headers: { my_header: 'my_value' },
    body: JSON.stringify({
      resource: event.resource,
      body: JSON.parse(event.body || '{}'),
      method: event.httpMethod,
      pathParameters: event.pathParameters,
      message: `Create a user.`,
    }),
  };
  return response;
}

async function updateUser(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  const response: APIGatewayProxyResult = {
    statusCode: 200,
    headers: { my_header: 'my_value' },
    body: JSON.stringify({
      resource: event.resource,
      body: JSON.parse(event.body || '{}'),
      method: event.httpMethod,
      pathParameters: event.pathParameters,
      message: `Update a user ID: ${(event.pathParameters || {}).userId || false}`,
    }),
  };
  return response;
}

async function deleteUser(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  const response: APIGatewayProxyResult = {
    statusCode: 200,
    headers: { my_header: 'my_value' },
    body: JSON.stringify({
      resource: event.resource,
      body: JSON.parse(event.body || '{}'),
      method: event.httpMethod,
      pathParameters: event.pathParameters,
      message: `Delete a user ID: ${(event.pathParameters || {}).userId || false}`,
    }),
  };
  return response;
}
