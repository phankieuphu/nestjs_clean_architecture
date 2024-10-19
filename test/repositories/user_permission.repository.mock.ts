import { IUserPermissionRepository } from 'src/interfaces';
import { Mocked, vi } from 'vitest';
export const userPermissionRepositoryMock: Mocked<IUserPermissionRepository> = {
  getUserPermissions: vi.fn(),
  findOneByUserIdAndPermission: vi.fn(),
  create: vi.fn(),
  softDeleteWithDeletedBy: vi.fn(),
};
