import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseConnectionString } from './utils/databaseConnectionString';
import { UserModule } from './user/user.module';
import { User } from 'aws-cdk-lib/aws-iam';
import { UserSchema } from './user/schema/user.schema';
import { AuthModule } from './auth/auth.module';
import { TenantModule } from './tenant/tenant.module';
import { PropertyModule } from './property/property.module';
import { OpenHouseModule } from './open-house/open-house.module';
import { EnrollHouseModule } from './enroll/enroll-house.module';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forRoot(
      databaseConnectionString(
        process.env.DB_HOST,
        process.env.DB_PORT,
        process.env.DB_CONNECTION,
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASS,
      ),
    ),
    TenantModule,
    PropertyModule,
    OpenHouseModule,
    UserModule,
    AuthModule,
    EnrollHouseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
