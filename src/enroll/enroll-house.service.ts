import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { EnrollHouseInputDto } from './dto/enroll-house.dto';
import { EnrollHouse, EnrollHouseDocument } from './schema/enroll-house.schema';
import { Tenant, TenantDocument } from '../tenant/schema/tenant.schema';
import {
  OpenHouse,
  OpenHouseDocument,
} from 'src/open-house/schema/open-house.schema';

@Injectable()
export class EnrollHouseService {
  constructor(
    @InjectModel(Tenant.name)
    private readonly TenantModel: Model<TenantDocument>,
    @InjectModel(OpenHouse.name)
    private readonly OpenHouseModel: Model<OpenHouseDocument>,
    @InjectModel(EnrollHouse.name)
    private readonly EnrollHouseModel: Model<EnrollHouseDocument>,
  ) {}

  async checkAvailability(houseId: string) {
    const house = new mongoose.Types.ObjectId(houseId);
    const houseDetail = await this.OpenHouseModel.findById(house).exec();
    if (houseDetail) {
      if (houseDetail.currentCount + 1 > houseDetail.visitorAmount) {
        throw new HttpException(
          'Visitor amount is fullfilled',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  async updateVisiterAmount(houseId: string, isVisiterAdded: boolean) {
    const house = new mongoose.Types.ObjectId(houseId);
    const houseDetail = await this.OpenHouseModel.findById(house).exec();
    if (houseDetail) {
      let count;
      if (isVisiterAdded) {
        count = houseDetail.currentCount + 1;
      } else {
        count = houseDetail.currentCount - 1;
      }
      const updateData = await this.OpenHouseModel.updateOne(
        {
          _id: houseId,
        },
        {
          $set: {
            currentCount: count,
          },
        },
        { new: true },
      );
      return updateData;
    }
  }

  async create(enrollHouseInputDto: EnrollHouseInputDto) {
    await this.checkAvailability(enrollHouseInputDto.openHouse);
    const data = new this.EnrollHouseModel(enrollHouseInputDto);
    const enrolledUserData = await data.save();
    const tenant = new mongoose.Types.ObjectId(enrollHouseInputDto.tenant);
    await this.TenantModel.findByIdAndUpdate(
      tenant,
      {
        isEnrolled: true,
      },
      { new: true },
    );
    await this.updateVisiterAmount(enrolledUserData.openHouse.toString(), true);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Created Enroll Successfully',
      data: enrolledUserData,
    };
  }

  async update(id: string) {
    const house = new mongoose.Types.ObjectId(id);
    const data = await this.EnrollHouseModel.findByIdAndDelete(house).exec();
    if (data) {
      const tenant = new mongoose.Types.ObjectId(data.tenant.toString());
      const houseId = new mongoose.Types.ObjectId(tenant);
      await this.TenantModel.findByIdAndUpdate(
        houseId,
        {
          isEnrolled: false,
        },
        { new: true },
      );
      this.updateVisiterAmount(data.openHouse.toString(), false);
    }
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Updated Unroll Successfully',
    };
  }

  async get() {
    const enrollList = await this.EnrollHouseModel.find()
      .populate('tenant')
      .populate('openHouse');
    return {
      statusCode: HttpStatus.OK,
      message: 'All Enrollment found successfully.',
      data: enrollList,
    };
  }
}
