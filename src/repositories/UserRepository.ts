import { User } from '../entities/User';

export interface IUserRepository {
  findUser(id: string): User;
}
