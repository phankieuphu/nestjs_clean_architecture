import { UserPermission } from 'src/entities/user_permission.entity';
import { UserPermissionEnum } from 'src/entities/enum/user.enum';
import { userStub } from './user.stub';

/**
 * Sample UserPermission data for testing
 */
export const userPermissionStub: UserPermission[] = [
  {
    id: '1',
    user_id: 'user1',
    permission: UserPermissionEnum.SERVICE_ADMIN,
    user: userStub[0],
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
    created_by: 'system',
    updated_by: 'system',
    deleted_by: null,
  },
  {
    id: '2',
    user_id: 'user1',
    permission: UserPermissionEnum.SERVICE_TMS_MEMBER,
    user: userStub[0],
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
    created_by: 'system',
    updated_by: 'system',
    deleted_by: null,
  },
  {
    id: '3',
    user_id: 'user1',
    permission: UserPermissionEnum.SERVICE_VIEW_DASHBOARD,
    user: userStub[0],
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
    created_by: 'system',
    updated_by: 'system',
    deleted_by: null,
  },
];
