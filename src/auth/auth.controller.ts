import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { EmailDto } from './dto/email.dto';
import { LoginDto } from './dto/login.dto';
import { MobileDto } from './dto/mobile.dto';
import { LocalAuthGuard } from './jwt/local-auth.guard';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Auth and Login User' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req, @Body() loginDto: LoginDto) {
    console.log(req.user);

    return this.authService.login(req.user);
  }

  @ApiOperation({ summary: 'Do you forget password? (send to my phone)' })
  @Post('login/forgetPassMobile')
  forgetPassSendMobile(@Body() mobileDto: MobileDto) {
    return this.authService.forgetPassSendMobile(mobileDto);
  }

  // @ApiOperation({ summary: 'Do you forget password? (send to my email)' })
  // @Post('login/forgetPassEmail')
  // forgetPassSendEmail(@Body() emailDto: EmailDto) {

  //   return  this.authService.forgetPassSendEmail(emailDto);
  // }
}
