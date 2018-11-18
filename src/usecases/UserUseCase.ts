import { User } from '../entities/User';

export interface IUserUseCase {
  listUsers(input: ListUserInputData): ListUserOutputData;
  getUser(input: GetUserInputData): GetUserOutputData;
  createUser(input: CreateUserInputData): CreateUserOutputData;
  updateUser(input: UpdateUserInputData): UpdateUserOutputData;
  deleteUser(input: DeleteUserInputData): DeleteUserOutputData;
}

export class UserUseCase implements IUserUseCase {
  listUsers(input: ListUserInputData): ListUserOutputData {
    return { message: 'This is a list response.' };
  }

  getUser(input: GetUserInputData): GetUserOutputData {
    return { message: 'This is a get response.' };
  }

  createUser(input: CreateUserInputData): CreateUserOutputData {
    return { message: 'This is a create response.' };
  }

  updateUser(input: UpdateUserInputData): UpdateUserOutputData {
    return { message: 'This is a update response.' };
  }

  deleteUser(input: DeleteUserInputData): DeleteUserOutputData {
    return { message: 'This is a delete response.' };
  }
}

export type ListUserInputData = { message: string };
export type ListUserOutputData = { message: string };
export type GetUserInputData = { message: string };
export type GetUserOutputData = { message: string };
export type CreateUserInputData = { message: string };
export type CreateUserOutputData = { message: string };
export type UpdateUserInputData = { message: string };
export type UpdateUserOutputData = { message: string };
export type DeleteUserInputData = { message: string };
export type DeleteUserOutputData = { message: string };
