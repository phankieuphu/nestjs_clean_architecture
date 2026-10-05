import { User } from 'src/entities';
import { IPaginationMeta } from './response.interface';

export const IUserRepository = 'IUserRepository';
export interface IUserRepository {
  create(data: Partial<User>): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAndCount(
    keyword: string | undefined,
    meta: IPaginationMeta,
  ): Promise<[User[], number]>;
  update(id: string, data: Partial<User>): Promise<void>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
}
