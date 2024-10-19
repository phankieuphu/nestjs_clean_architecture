import { User } from 'src/entities/user.entity';
import { UserRole } from 'src/entities/enum';

/**
 * Sample User data for testing
 */
export const userStub: User[] = [
  {
    id: 'user1',
    azure_id: 'azure123',
    slack_id: 'slack123',
    role: UserRole.ADMIN,
    type: 'internal',
    name: 'John Doe',
    department: 'Engineering',
    company_phone_number: '123-456-7890',
    position: 'Software Engineer',
    office_name: 'Main Office',
    detected_area: 'Area51',
    company_email: 'johndoe@example.com',
    external_id: 'ext123',
    user_name: 'johndoe',
    userPermissions: [], // This will be populated in tests as needed
    active: true,
    deleted_at: null,
    created_at: new Date(),
    updated_at: new Date(),
    created_by: 'system',
    updated_by: 'system',
    deleted_by: null,
  },
  // Add more users if necessary
];
