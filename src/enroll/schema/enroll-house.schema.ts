import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { OpenHouse } from 'src/open-house/schema/open-house.schema';
import { Property } from 'src/property/schema/property.schema';
import { Tenant } from 'src/tenant/schema/tenant.schema';

export type EnrollHouseDocument = EnrollHouse & Document;

@Schema({ timestamps: true })
export class EnrollHouse {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Tenant.name })
  @Type(() => Tenant)
  tenant: Tenant;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: OpenHouse.name })
  @Type(() => OpenHouse)
  openHouse: OpenHouse;
}

export const EnrollHouseSchema = SchemaFactory.createForClass(EnrollHouse);
