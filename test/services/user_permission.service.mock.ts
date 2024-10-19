import { Mocked, vi } from 'vitest';
import { UserPermissionService } from 'src/services/user_permission.service';

export const userPermissionServiceMock: Mocked<Partial<UserPermissionService>> = {
  getUserPermissions: vi.fn(),
  assignServicePermission: vi.fn(),
  checkConflictServicePermission: vi.fn(),
  ensureServiceViewDashboardPermission: vi.fn(),
  createUserPermission: vi.fn(),
  getUserPermission: vi.fn(),
  checkExitingUser: vi.fn(),
  removeServicePermission: vi.fn(),
  assignPermission: vi.fn(),
  removePermission: vi.fn(),
};
