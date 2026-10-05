import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { IPaginationMeta, IUserRepository } from 'src/interfaces';
import { Like, Repository } from 'typeorm';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  create(data: Partial<User>): Promise<User> {
    return this.repository.save(this.repository.create(data));
  }

  findById(id: string): Promise<User | null> {
    return this.repository.findOne({ where: { id } });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ where: { company_email: email } });
  }

  findAndCount(
    keyword: string | undefined,
    meta: IPaginationMeta,
  ): Promise<[User[], number]> {
    const page = meta.page ?? 1;
    const pageSize = meta.pageSize ?? 20;
    const where = keyword
      ? [
          { name: Like(`%${keyword}%`) },
          { company_email: Like(`%${keyword}%`) },
        ]
      : undefined;

    return this.repository.findAndCount({
      where,
      order: { [meta.orderBy ?? 'created_at']: meta.sortOrder ?? 'DESC' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }

  async update(id: string, data: Partial<User>): Promise<void> {
    await this.repository.update(id, data);
  }

  async softDelete(id: string, deletedBy?: string): Promise<void> {
    if (deletedBy) {
      await this.repository.update(id, { deleted_by: deletedBy });
    }
    await this.repository.softDelete(id);
  }
}
