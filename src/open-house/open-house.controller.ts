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
import { OpenHouseService } from './open-house.service';
import { OpenHouseInputDto } from './dto/open-house.dto';

@Controller('app')
export class OpenHouseController {
  constructor(private readonly openHouseService: OpenHouseService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/open-house')
  async createOpenHouse(
    @Res() response,
    @Body() createOpenHouseDto: OpenHouseInputDto,
  ) {
    try {
      const newOpenHouse = await this.openHouseService.createOpenHouse(
        createOpenHouseDto,
      );
      return response.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        message: 'Open House has been created successfully',
        data: newOpenHouse,
      });
    } catch (err) {
      return response
        .status(err.status)
        .json({ statusCode: err.status, message: err.response });
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/open-house')
  async getOpenHouseList(@Res() response) {
    try {
      const UserData = await this.openHouseService.getOpenHouseList();
      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'All Open House data found successfully',
        data: UserData,
      });
    } catch (err) {
      return response
        .status(err.status)
        .json({ statusCode: err.status, message: err.response });
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/open-house/:id')
  async getOpenHouseById(@Res() response, @Param('id') userId: string) {
    try {
      const existingUser = await this.openHouseService.getOpenHouseById(userId);
      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Open House found successfully',
        data: existingUser,
      });
    } catch (err) {
      return response
        .status(err.status)
        .json({ statusCode: err.status, message: err.response });
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/open-house/:id')
  async updateOpenHouseById(
    @Res() response,
    @Param('id') userId: string,
    @Body() updateOpenHouse: OpenHouseInputDto,
  ) {
    try {
      const existingUser = await this.openHouseService.updateOpenHouseById(
        userId,
        updateOpenHouse,
      );
      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Open House has been successfully updated',
        data: existingUser,
      });
    } catch (err) {
      return response
        .status(err.status)
        .json({ statusCode: err.status, message: err.response });
    }
  }
}
