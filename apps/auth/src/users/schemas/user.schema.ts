import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema({ versionKey: false })
export class User extends AbstractDocument {
  @Prop({ unique: true })
  email: string;
  @Prop()
  password: string;
}
export const userSchema = SchemaFactory.createForClass(User);
