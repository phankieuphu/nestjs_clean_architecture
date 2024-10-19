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

export abstract class BaseLocationEntity {
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

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updated_at',
    nullable: true,
  })
  updated_at: Date;

  @Column({ length: 255 })
  prefecture_code: string;

  @Column({ length: 255 })
  region_code: string;

  @Column({ length: 255 })
  area_code: string;

  @Column()
  event_time: Date;

  deleted_at?: Date;
}
