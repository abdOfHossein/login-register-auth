import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginDto } from './login.dto';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Auth and Login User' })
  // @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req, @Body() loginDto: LoginDto) {
    console.log(req.user);
    
    return this.authService.login(req.user);
  }
}
