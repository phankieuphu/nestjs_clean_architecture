import {
  IUserRepository,
} from 'src/interfaces';
import { UserRepository } from 'src/repositories/user.repository';

export const repositories = [
  { provide: IUserRepository, useClass: UserRepository },
];
