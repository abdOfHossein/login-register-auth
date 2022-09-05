import { Module } from '@nestjs/common';
import { SmsService } from './service/sms.service';
import { HistoryModule } from "../history/history.module";
import { RedisModule } from "../redis/redis.module";

@Module({
  imports :[ HistoryModule ,
  RedisModule.forRoot("127.0.0.1" , 6379)] ,
  providers: [SmsService] ,
  exports: [SmsService]
})
export class SmsModule {}
