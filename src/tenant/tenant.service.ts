import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { TenantInputDto } from './dto/create-tenant.dto';
import { Tenant, TenantDocument } from './schema/tenant.schema';

@Injectable()
export class TenantService {
  constructor(
    @InjectModel(Tenant.name)
    private readonly TenantModel: Model<TenantDocument>,
  ) {}

  async createTenant(createTenantDto: TenantInputDto) {
    const newTenant = new this.TenantModel(createTenantDto);
    return await newTenant.save();
  }

  async getTenantList() {
    const UserData = await this.TenantModel.find();
    if (!UserData || UserData.length == 0) {
      throw new HttpException('Users data not found!', HttpStatus.NOT_FOUND);
    }
    return UserData;
  }

  async getTenantById(userId: string) {
    const id = new mongoose.Types.ObjectId(userId);
    const existingUser = await this.TenantModel.findById(id).exec();
    if (!existingUser) {
      throw new HttpException(
        `User #${userId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return existingUser;
  }

  async updateTenantById(userId: string, updateTenantDto: TenantInputDto) {
    const id = new mongoose.Types.ObjectId(userId);
    const existingTenant = await this.TenantModel.findByIdAndUpdate(
      id,
      updateTenantDto,
      { new: true },
    );
    if (!existingTenant) {
      throw new HttpException(
        `Tenant #${userId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return existingTenant;
  }
}
