import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventConstant } from 'src/constant/event.constant';
import { ErrorMessages } from 'src/constant/error.constant';
import { CreateUserDto, GetListUserDto, UpdateUserDto } from 'src/dtos';
import { User } from 'src/entities';
import { IResponse, IUserRepository } from 'src/interfaces';

@Injectable()
export class UserService {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async createUser(body: CreateUserDto, createdBy?: string): Promise<User> {
    const existed = await this.userRepository.findByEmail(body.company_email);
    if (existed) {
      throw new ConflictException(ErrorMessages.EMAIL_EXISTS);
    }

    const user = await this.userRepository.create({
      ...body,
      created_by: createdBy,
    });
    this.eventEmitter.emit(EventConstant.USER_CREATED, user);
    return user;
  }

  async getListUser(query: GetListUserDto): Promise<IResponse<User[]>> {
    const meta = { page: 1, pageSize: 20, ...query.meta };
    const [data, total] = await this.userRepository.findAndCount(
      query.keyword,
      meta,
    );
    return { data, meta: { ...meta, total } };
  }

  async getUserDetail(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(ErrorMessages.USER_NOT_FOUND);
    }
    return user;
  }

  async updateUser(
    body: UpdateUserDto,
    id: string,
    updatedBy?: string,
  ): Promise<User> {
    await this.getUserDetail(id);
    await this.userRepository.update(id, { ...body, updated_by: updatedBy });
    return this.getUserDetail(id);
  }

  async deleteUser(id: string, deletedBy?: string): Promise<void> {
    await this.getUserDetail(id);
    await this.userRepository.softDelete(id, deletedBy);
  }

  getProfile(id: string): Promise<User> {
    return this.getUserDetail(id);
  }
}
