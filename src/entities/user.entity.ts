import { Column, DeleteDateColumn, Entity, Index, OneToMany } from 'typeorm';

import { BaseEntity } from './base.entity';
import { UserRole } from './enum/user.enum';
import { UserPermission } from './user_permission.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ length: 255, nullable: true, name: 'azure_id' })
  azure_id: string;

  @Column({ length: 255, nullable: true, name: 'slack_id' })
  slack_id: string;

  @Column({ type: 'enum', enum: UserRole, nullable: true, name: 'role' })
  role: string;

  @Column({ length: '255', nullable: true, name: 'type' })
  type: string;

  @Column({ length: 255, nullable: true, name: 'name' })
  name: string;

  @Column({ length: 255, nullable: true, name: 'department' })
  department: string;

  @Column({ length: 255, nullable: true, name: 'company_phone_number' })
  company_phone_number: string;

  @Column({ length: 255, nullable: true, name: 'position' })
  position: string;

  @Column({ length: 255, nullable: true, name: 'office_name' })
  office_name: string;

  @Column({ length: 255, nullable: true, name: 'detected_area' })
  detected_area: string;

  @Index('company_email_UNIQUE', { unique: true })
  @Column({ length: 255, nullable: true, name: 'company_email' })
  company_email: string;

  @Column({ length: 255, nullable: true, name: 'external_id' })
  external_id: string;

  @Column({ length: 255, nullable: true, name: 'user_name' })
  user_name: string;

  @OneToMany(() => UserPermission, (userPermission) => userPermission.user)
  userPermissions: UserPermission[];

  @Column({ type: 'boolean', default: false, name: 'active' })
  active: boolean;

  @DeleteDateColumn({
    type: 'timestamp',
    name: 'deleted_at',
    nullable: true,
  })
  deleted_at: Date;
}
