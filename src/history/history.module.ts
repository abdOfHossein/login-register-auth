import { Module } from '@nestjs/common';
import { HistoryService } from './service/history.service';
import { MongooseModule } from "../mongoos/mongoos.module";
import { Connection } from "mongoose";
import { SmsLogHistory, SmsLogSchema } from "./model/sms.log.schema";

@Module({
  imports :[
    MongooseModule.forRoot("127.0.0.1" , 27017 , "test")
  ] ,
  providers: [HistoryService ,
    {
      provide: 'SMS_LOG_MODEL',
      useFactory: (connection: Connection) =>
        connection.model(SmsLogHistory.name, SmsLogSchema),
      inject: ['DATABASE_CONNECTION'],
    }
  ] ,
  exports :[HistoryService]
})
export class HistoryModule {}
