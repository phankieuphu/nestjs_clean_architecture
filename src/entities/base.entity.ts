import { Column, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 36, nullable: true })
  created_by: string;
  @Column({ length: 36, nullable: true })
  updated_by: string;
  @Column({ length: 36, nullable: true })
  deleted_by: string;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
    nullable: true,
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updated_at',
    nullable: true,
  })
  updated_at: Date;

  deleted_at?: Date;
}
