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
import { PropertyService } from './property.service';
import { PropertyInputDto } from './dto/create-property.dto';

@Controller('app')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/property')
  async createProperty(
    @Res() response,
    @Body() createPropertyDto: PropertyInputDto,
  ) {
    try {
      const newProperty = await this.propertyService.createProperty(
        createPropertyDto,
      );
      return response.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        message: 'Property has been created successfully',
        data: newProperty,
      });
    } catch (err) {
      return response
        .status(err.status)
        .json({ statusCode: err.status, message: err.response });
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/property')
  async getPropertyList(@Res() response) {
    try {
      const UserData = await this.propertyService.getPropertyList();
      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'All Property data found successfully',
        data: UserData,
      });
    } catch (err) {
      return response
        .status(err.status)
        .json({ statusCode: err.status, message: err.response });
    }
  }

  @Get('/property-open-house/:id')
  async getOpenHousePropertyList(@Res() response, @Param('id') userId: string) {
    try {
      const UserData = await this.propertyService.getOpenHouseForProperty(
        userId,
      );
      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'All Open house Property data found successfully',
        data: UserData,
      });
    } catch (err) {
      return response
        .status(err.status)
        .json({ statusCode: err.status, message: err.response });
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/property/:id')
  async getPropertyById(@Res() response, @Param('id') userId: string) {
    try {
      const existingUser = await this.propertyService.getPropertyById(userId);
      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Property found successfully',
        data: existingUser,
      });
    } catch (err) {
      return response
        .status(err.status)
        .json({ statusCode: err.status, message: err.response });
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/property/:id')
  async updatePropertyById(
    @Res() response,
    @Param('id') userId: string,
    @Body() updatePropertyDto: PropertyInputDto,
  ) {
    try {
      const existingUser = await this.propertyService.updatePropertyById(
        userId,
        updatePropertyDto,
      );
      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Tenant has been successfully updated',
        data: existingUser,
      });
    } catch (err) {
      return response
        .status(err.status)
        .json({ statusCode: err.status, message: err.response });
    }
  }
}
