import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { genSalt, hash } from 'bcryptjs';
import { Model } from 'mongoose';
import { User, UserDocument } from './user/schema/user.schema';
import { UserInputDto } from './user/dto/create-user.dto';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>,
  ) {}

  async onModuleInit() {
    try {
      const salt = await genSalt(10);
      const hashPassword = await hash('admin', salt);

      const defaultUser: UserInputDto = {
        name: 'Super Admin',
        email: 'admin@admin.com',
        password: hashPassword,
      };

      const existingUser = await this.UserModel.findOne({
        email: 'admin@admin.com',
      }).exec();
      if (!existingUser) {
        const newUser = new this.UserModel(defaultUser);
        await newUser.save();
        return true;
      }
      return true;
    } catch (e) {
      throw e;
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}
