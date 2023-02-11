import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { OpenHouse } from 'src/open-house/schema/open-house.schema';
import { Tenant } from 'src/tenant/schema/tenant.schema';

export type PropertyDocument = Property & Document;

@Schema({ timestamps: true })
export class Property {
  @Prop({
    type: String,
    default: null,
  })
  name: string;

  @Prop({
    type: String,
    default: null,
  })
  address: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Tenant.name })
  @Type(() => Tenant)
  owner: Tenant;
}

export const PropertySchema = SchemaFactory.createForClass(Property);
