import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TenantService } from './tenant.service';
import { TenantInputDto } from './dto/create-tenant.dto';

@Controller('app')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/tenant')
  async createTenantUser(
    @Res() response,
    @Body() createTenantDto: TenantInputDto,
  ) {
    try {
      const newUser = await this.tenantService.createTenant(createTenantDto);
      return response.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        message: 'User has been created successfully',
        data: newUser,
      });
    } catch (err) {
      return response
        .status(err.status)
        .json({ error: { message: err.response } });
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/tenant')
  async getTenantList(@Res() response) {
    try {
      const UserData = await this.tenantService.getTenantList();
      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'All Tenants data found successfully',
        data: UserData,
      });
    } catch (err) {
      return response
        .status(err.status)
        .json({ error: { message: err.response } });
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/tenant/:id')
  async getTenantById(@Res() response, @Param('id') userId: string) {
    try {
      const existingUser = await this.tenantService.getTenantById(userId);
      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Tenant Data found successfully',
        data: existingUser,
      });
    } catch (err) {
      return response
        .status(err.status)
        .json({ error: { message: err.response } });
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/tenant/:id')
  async updateTenantById(
    @Res() response,
    @Param('id') userId: string,
    @Body() updateTenantDto: TenantInputDto,
  ) {
    try {
      const existingUser = await this.tenantService.updateTenantById(
        userId,
        updateTenantDto,
      );
      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Tenant has been successfully updated',
        data: existingUser,
      });
    } catch (err) {
      return response
        .status(err.status)
        .json({ error: { message: err.response } });
    }
  }
}
