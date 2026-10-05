import { UserRole } from 'src/entities/enum/user.enum';

export const UserConstant = {
  ACTIVE: true,
  INACTIVE: false,
  ROLE_ADMIN: UserRole.ADMIN,
  ROLE_USER: UserRole.USER,
};
