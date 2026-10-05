import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/entities/enum/user.enum';
import { IPaginationMeta } from 'src/interfaces';

export class CreateUserDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  company_email: string;
  @ApiPropertyOptional({ enum: UserRole })
  role?: UserRole;
  @ApiPropertyOptional()
  user_name?: string;
  @ApiPropertyOptional()
  department?: string;
  @ApiPropertyOptional()
  position?: string;
  @ApiPropertyOptional()
  office_name?: string;
  @ApiPropertyOptional()
  company_phone_number?: string;
  @ApiPropertyOptional()
  active?: boolean;
}

export class UpdateUserDto {
  @ApiPropertyOptional()
  name?: string;
  @ApiPropertyOptional({ enum: UserRole })
  role?: UserRole;
  @ApiPropertyOptional()
  user_name?: string;
  @ApiPropertyOptional()
  department?: string;
  @ApiPropertyOptional()
  position?: string;
  @ApiPropertyOptional()
  office_name?: string;
  @ApiPropertyOptional()
  company_phone_number?: string;
  @ApiPropertyOptional()
  active?: boolean;
}

export class GetListUserDto {
  keyword?: string;
  // Filled by JoiValidationPipe from page / pageSize / orderBy / sortOrder
  meta?: IPaginationMeta;
}
