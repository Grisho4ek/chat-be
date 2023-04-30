import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('user')
export class User extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  auth_id: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;
  @ApiProperty({
    required: false,
  })
  @Column({ nullable: true })
  name?: string;
  @ApiProperty({
    required: false,
  })
  @Column({ nullable: true })
  family_name?: string;
  @ApiProperty({
    required: false,
  })
  @Column({ nullable: true })
  gender?: string;

  @ApiProperty({
    required: false,
  })
  @Column({ nullable: true })
  birthdate?: Date;

  @ApiProperty({
    required: false,
  })
  @Column({ nullable: true })
  picture?: string;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}
