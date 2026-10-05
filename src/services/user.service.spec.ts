import { ConflictException, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test } from '@nestjs/testing';
import { EventConstant } from 'src/constant/event.constant';
import { IUserRepository } from 'src/interfaces';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  const repository = {
    create: vi.fn(),
    findById: vi.fn(),
    findByEmail: vi.fn(),
    findAndCount: vi.fn(),
    update: vi.fn(),
    softDelete: vi.fn(),
  };
  const eventEmitter = { emit: vi.fn() };
  const user = { id: 'user-id', name: 'John', company_email: 'a@b.com' };

  beforeEach(async () => {
    vi.resetAllMocks();
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: IUserRepository, useValue: repository },
        { provide: EventEmitter2, useValue: eventEmitter },
      ],
    }).compile();
    service = module.get(UserService);
  });

  describe('createUser', () => {
    it('creates the user and emits an event', async () => {
      repository.findByEmail.mockResolvedValue(null);
      repository.create.mockResolvedValue(user);

      await expect(
        service.createUser({ name: 'John', company_email: 'a@b.com' }, 'admin'),
      ).resolves.toEqual(user);
      expect(repository.create).toHaveBeenCalledWith({
        name: 'John',
        company_email: 'a@b.com',
        created_by: 'admin',
      });
      expect(eventEmitter.emit).toHaveBeenCalledWith(
        EventConstant.USER_CREATED,
        user,
      );
    });

    it('throws when the email already exists', async () => {
      repository.findByEmail.mockResolvedValue(user);
      await expect(
        service.createUser({ name: 'John', company_email: 'a@b.com' }),
      ).rejects.toBeInstanceOf(ConflictException);
    });
  });

  it('getListUser returns data with pagination meta', async () => {
    repository.findAndCount.mockResolvedValue([[user], 1]);
    await expect(
      service.getListUser({ keyword: 'jo', meta: { page: 2, pageSize: 5 } }),
    ).resolves.toEqual({
      data: [user],
      meta: { page: 2, pageSize: 5, total: 1 },
    });
    expect(repository.findAndCount).toHaveBeenCalledWith('jo', {
      page: 2,
      pageSize: 5,
    });
  });

  it('getUserDetail throws when the user does not exist', async () => {
    repository.findById.mockResolvedValue(null);
    await expect(service.getUserDetail('missing')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('getProfile returns the user', async () => {
    repository.findById.mockResolvedValue(user);
    await expect(service.getProfile('user-id')).resolves.toEqual(user);
  });

  it('updateUser updates and returns the fresh user', async () => {
    repository.findById.mockResolvedValue(user);
    await service.updateUser({ name: 'Jane' }, 'user-id', 'admin');
    expect(repository.update).toHaveBeenCalledWith('user-id', {
      name: 'Jane',
      updated_by: 'admin',
    });
  });

  it('deleteUser soft deletes the user', async () => {
    repository.findById.mockResolvedValue(user);
    await service.deleteUser('user-id', 'admin');
    expect(repository.softDelete).toHaveBeenCalledWith('user-id', 'admin');
  });
});
