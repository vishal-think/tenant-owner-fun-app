import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
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
    type: String,
    default: null,
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
