import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { EmailService } from './email.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.sendgrid.net',
        secure: false,
        // auth: {
        //   user: process.env.EMAIL_USER,
        //   pass: process.env.EMAIL_PASSWORD,
        // },
        tls: { rejectUnauthorized: false}
      },
      defaults:{
        from:'behzadshafieejoon1999@yahoo.com'
      }
    }),
  ],
  controllers: [],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
