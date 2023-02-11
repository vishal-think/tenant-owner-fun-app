import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TenantDocument = Tenant & Document;

@Schema({ timestamps: true })
export class Tenant {
  @Prop({
    type: String,
    default: null,
  })
  name: string;

  @Prop({
    type: String,
    default: null,
  })
  email: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  isEnrolled: boolean;
}

export const TenantSchema = SchemaFactory.createForClass(Tenant);
