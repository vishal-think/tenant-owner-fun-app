import { HttpStatus, Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { PropertyInputDto } from './dto/create-property.dto';
import { Property, PropertyDocument } from './schema/property.schema';
import { Tenant, TenantDocument } from '../tenant/schema/tenant.schema';
import {
  OpenHouse,
  OpenHouseDocument,
} from 'src/open-house/schema/open-house.schema';

@Injectable()
export class PropertyService {
  constructor(
    @InjectModel(Tenant.name)
    private readonly TenantModel: Model<TenantDocument>,
    @InjectModel(Property.name)
    private readonly PropertyModel: Model<PropertyDocument>,
    @InjectModel(OpenHouse.name)
    private readonly OpenHouseModel: Model<OpenHouseDocument>,
  ) {}

  async createProperty(createPropertyDto: PropertyInputDto) {
    const ownerId = new mongoose.Types.ObjectId(createPropertyDto.owner);
    const existingUser = await this.TenantModel.findById(ownerId).exec();
    if (existingUser) {
      const newProperty = new this.PropertyModel(createPropertyDto);
      return await newProperty.save();
    } else {
      throw new HttpException(
        'Provided Owner Id is not exist',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getPropertyList() {
    const UserData = await this.PropertyModel.find().populate('owner');
    if (!UserData || UserData.length == 0) {
      throw new HttpException('Users data not found!', HttpStatus.NOT_FOUND);
    }
    return UserData;
  }

  async getOpenHouseForProperty(id: string) {
    const propertyId = new mongoose.Types.ObjectId(id);
    return await this.OpenHouseModel.find({ property: propertyId }).populate(
      'property',
    );
  }

  async getPropertyById(userId: string) {
    const id = new mongoose.Types.ObjectId(userId);
    const existingUser = await this.PropertyModel.findById(id)
      .populate('owner')
      .exec();
    if (!existingUser) {
      throw new HttpException(
        `User #${userId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return existingUser;
  }

  async updatePropertyById(
    userId: string,
    updatePropertyDto: PropertyInputDto,
  ) {
    const ownerId = new mongoose.Types.ObjectId(userId);

    const existingProperty = await this.PropertyModel.findById(ownerId).exec();

    if (!existingProperty) {
      throw new HttpException(
        `Property #${userId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    const id = new mongoose.Types.ObjectId(userId);
    const existingPropertyData = await this.PropertyModel.findByIdAndUpdate(
      id,
      updatePropertyDto,
      { new: true },
    );

    return existingPropertyData;
  }
}
