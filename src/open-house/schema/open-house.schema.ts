import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { Property } from 'src/property/schema/property.schema';
import { Tenant } from 'src/tenant/schema/tenant.schema';

export type OpenHouseDocument = OpenHouse & Document;

@Schema({ timestamps: true })
export class OpenHouse {
  @Prop({
    type: Number,
    default: null,
  })
  visitorAmount: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Property.name })
  @Type(() => Property)
  property: Property;

  @Prop({
    type: String,
    default: null,
  })
  startDate: string;

  @Prop({ default: 0 })
  currentCount: number;
}

export const OpenHouseSchema = SchemaFactory.createForClass(OpenHouse);
