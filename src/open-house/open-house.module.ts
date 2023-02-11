import { Module } from '@nestjs/common';
import { OpenHouseService } from './open-house.service';
import { OpenHouseController } from './open-house.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tenant, TenantSchema } from '../tenant/schema/tenant.schema';
import { Property, PropertySchema } from '../property/schema/property.schema';
import { OpenHouse, OpenHouseSchema } from './schema/open-house.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tenant.name, schema: TenantSchema },
      { name: Property.name, schema: PropertySchema },
      { name: OpenHouse.name, schema: OpenHouseSchema },
    ]),
  ],
  providers: [OpenHouseService],
  controllers: [OpenHouseController],
})
export class OpenHouseModule {}
