import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { SmsLogHistory } from "../model/sms.log.schema";
import { CreateLogSmsDto } from "../dtos/create.log.sms.dto";

@Injectable()
export class HistoryService {
  constructor( @Inject('SMS_LOG_MODEL')
               private SmsLogModel: Model<SmsLogHistory>,) {
  }
  async createLog( createLogSmsDto : CreateLogSmsDto) {
    const history = new this.SmsLogModel(createLogSmsDto);
    return await history.save();
  }
}
