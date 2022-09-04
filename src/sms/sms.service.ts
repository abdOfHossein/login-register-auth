// import { Injectable } from '@nestjs/common';
// import { TwilioService } from 'nestjs-twilio';
// import { CreateSmDto } from './dto/create-sm.dto';
// import { UpdateSmDto } from './dto/update-sm.dto';
// const config = require('dotenv');

// @Injectable()
// export class SmsService {
//   public constructor(private readonly twilioService: TwilioService) {}

//   async sendSMS(creatSmsDto: CreateSmDto) {
//     try {

//       const messageConfig = {
//         body: 'SMS Body, sent to the phone!',
//         from: process.env.TWILIO_PHONE_NUMBER,
//         to: creatSmsDto.target,
//       };
//       const message = await this.twilioService.client.messages.create(
//         messageConfig,
//       );
//       console.log(message);

//       if (message.sid) {
//         return {
//           msg: 'OTP sent successfully',
//         };
//       }

//       // const option:any = JSON.stringify({
//       //   body: 'SMS Body, sent to the phone!',
//       //   from: process.env.TWILIO_PHONE_NUMBER,
//       //   to: '09153824415',
//       // })
//       // return this.twilioService.client.messages.create(option);
//     } catch (e) {
//       console.log('in err');

//       console.log(e);

//       throw e;
//     }
//   }

//   create(createSmDto: CreateSmDto) {
//     return 'This action adds a new sm';
//   }

//   findAll() {
//     return `This action returns all sms`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} sm`;
//   }

//   update(id: number, updateSmDto: UpdateSmDto) {
//     return `This action updates a #${id} sm`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} sm`;
//   }
// }

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';

@Injectable()
export default class SmsService {
  private readonly client: Twilio;
  private readonly conversationsServiceId: string;

  constructor(private configService: ConfigService) {
    this.client = new Twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN,
    );
  }

  /**
   * Creates a scoped conversation webhook
   * @param conversationId
   * @returns webhook sid
   */
  public createConversationWebhook = async (
    conversationId: string,
  ): Promise<string> => {
    const conversationsUrl = `${this.configService.get(
      EnvironmentEnums.APPLICATION_ENDPOINT,
    )}/conversations/${conversationId}/events`;

    const createRequest = await this.client.conversations
      .conversations(conversationId)
      .webhooks.create({
        configuration: {
          method: 'POST',
          filters: ['onMessageAdded'],
          url: conversationsUrl,
          replayAfter: 0,
        },
        target: 'webhook',
      });

    return createRequest.sid;
  };

  /**
   * Creates a message in the conversations service
   * @param conversationId
   * @param message
   * @returns message sid
   */
  public sendMessage = async (conversationId: string, message: string) => {
    const messageResponse = await this.client.conversations
      .services(this.conversationsServiceId)
      .conversations(conversationId)
      .messages.create({
        body: message,
      });

    return messageResponse.sid;
  };

  public getClient = (): Twilio => this.client;
}
