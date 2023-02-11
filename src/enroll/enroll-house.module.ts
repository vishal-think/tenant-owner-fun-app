import { Module } from '@nestjs/common';
import { EnrollHouseService } from './enroll-house.service';
import { EnrollHouseController } from './enroll-house.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tenant, TenantSchema } from '../tenant/schema/tenant.schema';
import { Property, PropertySchema } from '../property/schema/property.schema';
import { EnrollHouse, EnrollHouseSchema } from './schema/enroll-house.schema';
import { OpenHouse, OpenHouseSchema } from 'src/open-house/schema/open-house.schema';
import { OpenHouseService } from 'src/open-house/open-house.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tenant.name, schema: TenantSchema },
      { name: Property.name, schema: PropertySchema },
      { name: EnrollHouse.name, schema: EnrollHouseSchema },
      { name: OpenHouse.name, schema: OpenHouseSchema }
    ]),
  ],
  providers: [EnrollHouseService, OpenHouseService],
  controllers: [EnrollHouseController],
})
export class EnrollHouseModule {}
