import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseFilters,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HttpStatusCode } from 'axios';
import { Response } from 'express';
import { OrGuards, User } from 'src/decorators';
import {
  createUserSchema,
  getListUserSchema,
  updateUserContactSchema,
  updateUserRoleSchema,
  updateUserSchema,
} from 'src/dtos/schema/user.schema';
import {
  CreateUserDto,
  GetListUserDto,
  UpdateUserContactDto,
  UpdateUserDto,
  UpdateUserRoleDto,
} from 'src/dtos/user.dto';
import { HttpExceptionFilter } from 'src/exceptions';
import { JoiValidationPipe } from 'src/pipes/joi.pipe';
import { UserService } from 'src/services/user.service';
import { ResponseUtils } from 'src/utils/response.utils';

import { UserConstant } from 'src/constant/user.constant';
import { Roles } from 'src/decorators/role.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { ParseUUIDPipeCustom } from 'src/pipes/parse_uuid_custom.pipe';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

import config from '../config/env.config';
import { UserPermissionConstant } from 'src/constant/user_permission.constant';
import { Permissions } from 'src/decorators/permission.decorator';
import { PermissionsGuard } from 'src/guards/permissions.guard';
import { OrGuard } from 'src/guards/or-guard.guard';

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@UseFilters(new HttpExceptionFilter())
@Controller('/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly responseUtils: ResponseUtils,
  ) {}

  @Post('create')
  @UsePipes(new JoiValidationPipe(createUserSchema))
  async CreateUser(@Body() body: CreateUserDto, @Res() res: Response) {
    await this.userService.createUser(body);
    return this.responseUtils.success(
      {
        status_code: HttpStatusCode.Created,
      },
      res,
    );
  }

  @Get('get-list')
  @UseGuards(OrGuard)
  @OrGuards(RolesGuard, PermissionsGuard)
  @Roles(UserConstant.ROLE_ADMIN)
  @Permissions(UserPermissionConstant.SERVICE_PERMISSION.SERVICE_ADMIN)
  async GetListUser(
    @Query(new JoiValidationPipe(getListUserSchema)) query: GetListUserDto,
    @Res() res: Response,
  ) {
    const getListUser = await this.userService.getListUser(query);
    return this.responseUtils.success(
      {
        data: getListUser.data,
        meta: getListUser.meta,
      },
      res,
    );
  }

  @Get('get-detail/:id')
  async GetUserDetail(
    @Param('id', ParseUUIDPipeCustom) id: string,
    @Res() res: Response,
  ) {
    const userDetail = await this.userService.getUserDetail(id);
    return this.responseUtils.success(
      {
        data: userDetail,
      },
      res,
    );
  }

  @Put('update-info/:id')
  async updateUser(
    @Param('id', ParseUUIDPipeCustom) id: string,
    @Body(new JoiValidationPipe(updateUserSchema)) body: UpdateUserDto,
    @Res() res: Response,
  ) {
    const updateUser = await this.userService.updateUser(body, id);
    return this.responseUtils.success(
      {
        data: updateUser,
        status_code: HttpStatusCode.Ok,
      },
      res,
    );
  }

  @Delete('delete/:id')
  @UseGuards(RolesGuard)
  @Roles(UserConstant.ROLE_ADMIN)
  async deleteUser(
    @Param('id', ParseUUIDPipeCustom) id: string,
    @Res() res: Response,
  ) {
    await this.userService.deleteUser(id);
    return this.responseUtils.success(
      { status_code: HttpStatusCode.NoContent },
      res,
    );
  }

  @Get('list-user-contact/:id')
  async getListUserContact(
    @Param('id', ParseUUIDPipeCustom) id: string,
    @Res() res: Response,
  ) {
    const data = await this.userService.getListUserContact(id);
    return this.responseUtils.success(
      {
        data,
        status_code: HttpStatusCode.Ok,
      },
      res,
    );
  }

  @Post('update-contact/:id')
  async createContactUser(
    @User() user,
    @Param('id', ParseUUIDPipeCustom) id: string,
    @Body(new JoiValidationPipe(updateUserContactSchema))
    body: UpdateUserContactDto,
    @Res() res: Response,
  ) {
    const result = await this.userService.updateContactUser(id, body, user?.id);

    return this.responseUtils.success(
      {
        data: result,
        status_code: HttpStatusCode.Ok,
      },
      res,
    );
  }

  @Get('get-profile')
  async getUserProfile(@User() user, @Res() res: Response) {
    const userProfile = await this.userService.getProfile(user.id);
    return this.responseUtils.success(
      {
        data: userProfile,
      },
      res,
    );
  }

  @Put('update-role/:id')
  @UseGuards(RolesGuard)
  @Roles(UserConstant.ROLE_ADMIN)
  async updateUserRole(
    @Param('id', ParseUUIDPipeCustom) id: string,
    @Body(new JoiValidationPipe(updateUserRoleSchema)) body: UpdateUserRoleDto,
    @Req() req: any,
    @Res() res: Response,
  ) {
    if (id === req.user.id) {
      return this.responseUtils.success(
        { status_code: HttpStatusCode.NoContent },
        res,
      );
    }

    const data = await this.userService.updateUserRole(id, body);
    return this.responseUtils.success(
      {
        data,
        status_code: HttpStatusCode.Ok,
      },
      res,
    );
  }

  @Get('/preview-admin-manual-file')
  @UseGuards(RolesGuard)
  @Roles(UserConstant.ROLE_ADMIN)
  async previewAdminManualFile(@Res() res: Response): Promise<void> {
    try {
      const adminManualFilePath = config.MANUAL_FILE.ADMIN_MANUAL_FILE_PATH;
      const fileStream =
        await this.userService.downloadManualFile(adminManualFilePath);

      const adminManualFileName = config.MANUAL_FILE.ADMIN_MANUAL_FILE_NAME;
      const encodedFileName = encodeURIComponent(adminManualFileName);

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(
        'Content-Disposition',
        `inline; filename*=UTF-8''${encodedFileName}`,
      );

      fileStream.pipe(res);
    } catch (error) {
      throw new HttpException(
        'Failed to preview admin manual file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/preview-manual-file')
  @UseGuards(RolesGuard)
  @Roles(
    UserConstant.ROLE_ADMIN,
    UserConstant.ROLE_LEADER,
    UserConstant.ROLE_STAFF,
  )
  async previewManualFile(@Res() res: Response): Promise<void> {
    try {
      const manualFilePath = config.MANUAL_FILE.MANUAL_FILE_PATH;
      const fileStream =
        await this.userService.downloadManualFile(manualFilePath);

      const manualFileName = config.MANUAL_FILE.MANUAL_FILE_NAME;
      const encodedFileName = encodeURIComponent(manualFileName);

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(
        'Content-Disposition',
        `inline; filename*=UTF-8''${encodedFileName}`,
      );

      fileStream.pipe(res);
    } catch (error) {
      throw new HttpException(
        'Failed to preview manual file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
