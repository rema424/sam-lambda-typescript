import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { IUserUseCase, GetUserInputData } from '../usecases/UserUsecase';

export class UserController {
  constructor(readonly userUseCase: IUserUseCase) {}

  listUsers(event: APIGatewayEvent): APIGatewayProxyResult {
    const input = { message: event.body || '' };

    const data = this.userUseCase.listUsers(input);

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  }

  getUser(event: APIGatewayEvent): APIGatewayProxyResult {
    const message: string = JSON.parse(event.body || '{}').message || '';
    const input: GetUserInputData = { message };
    const data = this.userUseCase.getUser(input);
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  }

  createUser(event: APIGatewayEvent): APIGatewayProxyResult {
    const input = { message: event.body || '' };

    const data = this.userUseCase.createUser(input);

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  }

  updateUser(event: APIGatewayEvent): APIGatewayProxyResult {
    const input = { message: event.body || '' };

    const data = this.userUseCase.updateUser(input);

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  }

  deleteUser(event: APIGatewayEvent): APIGatewayProxyResult {
    const input = { message: event.body || '' };

    const data = this.userUseCase.deleteUser(input);

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  }
}
