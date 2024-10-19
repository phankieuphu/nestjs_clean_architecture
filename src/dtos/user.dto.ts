import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { PagingDto } from './paging.dto';
import { USER_EXAMPLE } from './constants/user.example';
import { BaseEntityDto } from './base.dto';
import { ContactType } from 'src/entities';

export class CreateUserDto extends BaseEntityDto {
  @IsEmpty()
  @Type(() => String)
  @ApiProperty({
    type: String,
    description: 'Input your Azure_id',
    example: USER_EXAMPLE.AZURE_ID,
  })
  azure_id: string;

  @IsEmpty({ message: 'Slack ID can not be null' })
  @Type(() => String)
  @ApiProperty({
    type: String,
    description: 'Input your Slack ID',
    example: USER_EXAMPLE.SLACK_ID,
  })
  slack_id: string;

  @IsEmpty()
  @Type(() => String)
  @ApiPropertyOptional({
    enum: ['ADMIN', 'LEADER', 'STAFF'],
    description: 'Input user role',
    example: USER_EXAMPLE.ROLE,
  })
  role: string;

  @IsEmpty({})
  @ApiPropertyOptional({
    type: String,
    example: USER_EXAMPLE.TYPE,
  })
  type: string;

  @IsNotEmpty({ message: 'Name user can not be null' })
  @ApiProperty({
    type: String,
    description: 'Input name user',
    required: true,
    example: USER_EXAMPLE.NAME,
  })
  name: string;

  @IsEmail({})
  @IsNotEmpty({ message: 'Email can not be null' })
  @ApiProperty({
    type: String,
    required: true,
    example: USER_EXAMPLE.COMPANY_EMAIL,
  })
  company_email: string;

  @IsEmpty()
  @ApiProperty({ type: String, example: USER_EXAMPLE.DEPARTMENT })
  department: string;

  @IsEmpty({ message: 'Phone number can not be null' })
  @ApiProperty({
    type: String,
    example: USER_EXAMPLE.COMPANY_PHONE_NUMBER,
  })
  company_phone_number: string;

  @IsEmpty()
  @ApiProperty({ type: String, example: USER_EXAMPLE.POSITION })
  position: string;

  @IsEmpty()
  @ApiPropertyOptional({ type: String, example: USER_EXAMPLE.OFFICE_NAME })
  office_name: string;

  @IsEmpty()
  @ApiProperty({
    type: String,
    example: USER_EXAMPLE.DETECTED_AREA,
  })
  detected_area: string;

  @IsEmpty()
  @ApiProperty({
    type: String,
  })
  user_name: string;

  @IsEmpty()
  active: boolean;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: String, example: USER_EXAMPLE.NAME })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: String, example: USER_EXAMPLE.SLACK_ID })
  slack_id?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: String, example: USER_EXAMPLE.AZURE_ID })
  azure_id?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: String, example: USER_EXAMPLE.TYPE })
  type?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: String, example: USER_EXAMPLE.ROLE })
  role?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: String, example: USER_EXAMPLE.POSITION })
  position?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: String, example: USER_EXAMPLE.DEPARTMENT })
  department?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: String, example: USER_EXAMPLE.COMPANY_PHONE_NUMBER })
  company_phone_number?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: String, example: USER_EXAMPLE.AREA_CODE })
  detected_area?: string;
}

export class GetListUserDto extends PagingDto {
  @ApiPropertyOptional({ type: String })
  @IsString({})
  position?: string;

  @ApiPropertyOptional({ type: String })
  @IsString({})
  office_name?: string;

  @ApiPropertyOptional({ type: String })
  name?: string;

  @ApiPropertyOptional({ type: String })
  department?: string;

  @ApiPropertyOptional({ type: Array })
  departments?: string[];
}

export class UserContactDto {
  @ApiPropertyOptional({ type: String })
  id?: string;

  @ApiProperty({ enum: ContactType })
  type: ContactType;

  @ApiProperty({ type: String })
  value: string;

  @ApiProperty({ type: Number })
  order: number;

  user_id?: string;
}

export class UpdateUserContactDto {
  @ApiProperty({ isArray: true, type: UserContactDto })
  user_contacts: UserContactDto[];

  @ApiProperty()
  slack_id: string;
}

export class GetListUserAffectedDto {
  detected_area: string;
}

export class UpdateUserRoleDto {
  @ApiProperty({
    type: Boolean,
    description: 'Value of switch role (true/false)',
  })
  value: boolean;
}
