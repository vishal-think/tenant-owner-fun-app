import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tenant, TenantSchema } from '../tenant/schema/tenant.schema';
import { Property, PropertySchema } from './schema/property.schema';
import { OpenHouse, OpenHouseSchema } from 'src/open-house/schema/open-house.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tenant.name, schema: TenantSchema },
      { name: Property.name, schema: PropertySchema },
      { name: OpenHouse.name, schema: OpenHouseSchema }
    ]),
  ],
  providers: [PropertyService],
  controllers: [PropertyController],
})
export class PropertyModule {}
