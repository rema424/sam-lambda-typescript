import { User, TUserInput } from './entities/User';
import { UserController } from './adapters/UserController';
import { UserUseCase } from './usecases/UserUsecase';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export async function main(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  console.log('event.httpMethod', event.httpMethod);
  console.log('event.body', event.body);

  const userUseCase = new UserUseCase();
  const userController = new UserController(userUseCase);

  const id: string = (event.pathParameters || {}).userId || '';

  switch (event.httpMethod) {
    case 'GET':
      if (id) {
        return userController.getUser(event);
      }
      return userController.listUsers(event);
    case 'POST':
      return userController.createUser(event);
    case 'PUT':
      return userController.updateUser(event);
    case 'DELETE':
      return userController.deleteUser(event);
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
  const obj: TUserInput = {
    id: '',
    name: 'taro sato',
    email: 'aaaaa@example.com',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const user1 = new User(obj);
  const user2 = new User();

  const response: APIGatewayProxyResult = {
    statusCode: 200,
    headers: { my_header: 'my_value' },
    body: JSON.stringify({
      resource: event.resource,
      body: JSON.parse(event.body || '{}'),
      method: event.httpMethod,
      pathParameters: event.pathParameters,
      message: `List users.`,
      user1: user1.greet(),
      user2: user2.greet(),
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
