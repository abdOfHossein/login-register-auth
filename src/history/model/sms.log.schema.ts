import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type SmsLogDocument = SmsLogHistory & Document;

@Schema({ timestamps: true })
export class SmsLogHistory {
  @Prop({ type: String })
  mobile: string;

  @Prop({ type: String })
  code: string;

  @Prop({ type: String })
  serial: string;

  @Prop({ type: String })
  hash_code: string;

}

export const SmsLogSchema = SchemaFactory.createForClass(SmsLogHistory);
