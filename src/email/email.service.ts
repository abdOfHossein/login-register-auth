import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}
  async sendPassToEmail(email: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Greeting from NestJS NodeMailer',
        context: {
          name: 'behzad',
        },
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
