import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HttpStatusCode } from 'axios';
import { Response } from 'express';
import { UserConstant } from 'src/constant/user.constant';
import { Roles, User } from 'src/decorators';
import { CreateUserDto, GetListUserDto, UpdateUserDto } from 'src/dtos';
import {
  createUserSchema,
  getListUserSchema,
  updateUserSchema,
} from 'src/dtos/schema/user.schema';
import { HttpExceptionFilter } from 'src/exceptions';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { JoiValidationPipe } from 'src/pipes/joi.pipe';
import { UserService } from 'src/services/user.service';
import { ResponseUtils } from 'src/utils/response.utils';

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@UseFilters(new HttpExceptionFilter())
@Controller('/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly responseUtils: ResponseUtils,
  ) {}

  @Post('create')
  @Roles(UserConstant.ROLE_ADMIN)
  async createUser(
    @User() user,
    @Body(new JoiValidationPipe(createUserSchema)) body: CreateUserDto,
    @Res() res: Response,
  ) {
    const data = await this.userService.createUser(body, user?.id);
    return this.responseUtils.success(
      { data, status_code: HttpStatusCode.Created },
      res,
    );
  }

  @Get('get-list')
  @Roles(UserConstant.ROLE_ADMIN)
  async getListUser(
    @Query(new JoiValidationPipe(getListUserSchema)) query: GetListUserDto,
    @Res() res: Response,
  ) {
    const result = await this.userService.getListUser(query);
    return this.responseUtils.success(
      { data: result.data, meta: result.meta },
      res,
    );
  }

  @Get('get-profile')
  async getUserProfile(@User() user, @Res() res: Response) {
    const data = await this.userService.getProfile(user.id);
    return this.responseUtils.success({ data }, res);
  }

  @Get('get-detail/:id')
  async getUserDetail(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() res: Response,
  ) {
    const data = await this.userService.getUserDetail(id);
    return this.responseUtils.success({ data }, res);
  }

  @Put('update-info/:id')
  async updateUser(
    @User() user,
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new JoiValidationPipe(updateUserSchema)) body: UpdateUserDto,
    @Res() res: Response,
  ) {
    const data = await this.userService.updateUser(body, id, user?.id);
    return this.responseUtils.success(
      { data, status_code: HttpStatusCode.Ok },
      res,
    );
  }

  @Delete('delete/:id')
  @Roles(UserConstant.ROLE_ADMIN)
  async deleteUser(
    @User() user,
    @Param('id', ParseUUIDPipe) id: string,
    @Res() res: Response,
  ) {
    await this.userService.deleteUser(id, user?.id);
    return this.responseUtils.success(
      { status_code: HttpStatusCode.NoContent },
      res,
    );
  }
}
