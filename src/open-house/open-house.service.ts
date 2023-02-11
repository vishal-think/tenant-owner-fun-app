import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { OpenHouseInputDto } from './dto/open-house.dto';
import { OpenHouse, OpenHouseDocument } from './schema/open-house.schema';
import { Property, PropertyDocument } from '../property/schema/property.schema';
import { Tenant, TenantDocument } from '../tenant/schema/tenant.schema';

@Injectable()
export class OpenHouseService {
  constructor(
    @InjectModel(Tenant.name)
    private readonly TenantModel: Model<TenantDocument>,
    @InjectModel(Property.name)
    private readonly PropertyModel: Model<PropertyDocument>,
    @InjectModel(OpenHouse.name)
    private readonly OpenHouseModel: Model<OpenHouseDocument>,
  ) {}

  async createOpenHouse(createOpenHouseDto: OpenHouseInputDto) {
    const property = await this.PropertyModel.findById(
      createOpenHouseDto.property,
    ).exec();
    if (!property) {
      throw new HttpException(
        "Provided property id doesn't not exist.",
        HttpStatus.NOT_FOUND,
      );
    }

    const newOpenHouse = new this.OpenHouseModel(createOpenHouseDto);
    return await newOpenHouse.save();
  }

  async getOpenHouseList() {
    const UserData = await this.OpenHouseModel.find().populate('property');
    if (!UserData || UserData.length == 0) {
      throw new NotFoundException('Users data not found!');
    }
    return UserData;
  }

  async getOpenHouseById(userId: string) {
    const id = new mongoose.Types.ObjectId(userId);
    const existingUser = await this.OpenHouseModel.findById(id)
      .populate('property')
      .exec();
    if (!existingUser) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return existingUser;
  }

  async updateOpenHouseById(
    userId: string,
    updateOpenHouse: OpenHouseInputDto,
  ) {
    const property = new mongoose.Types.ObjectId(updateOpenHouse.property);
    const existingProperty = await this.PropertyModel.findById(property).exec();

    if (!existingProperty) {
      throw new HttpException(
        'Provided property Id does not exist.',
        HttpStatus.NOT_FOUND,
      );
    }

    const id = new mongoose.Types.ObjectId(userId);
    const existingOpenHouse = await this.OpenHouseModel.findByIdAndUpdate(
      id,
      updateOpenHouse,
      { new: true },
    );
    if (!existingOpenHouse) {
      throw new NotFoundException(`Open House #${userId} not found`);
    }
    return existingOpenHouse;
  }
}
