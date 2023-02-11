import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/schema/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly UserModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async loginWithCredentials(user: User) {
    const userData = await this.UserModel.findOne({ email: user.email }).exec();
    return {
      statusCode: HttpStatus.OK,
      data: {
        access_token: this.jwtService.sign({
          userId: userData._id,
          userEmail: userData.email,
        }),
      },
    };
  }
}
