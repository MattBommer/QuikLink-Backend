import { Body, Req, Controller, Post, UseGuards, UnauthorizedException } from '@nestjs/common';
import { ResourceAuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { Verify } from './auth/verify.decorator';
import { UserDto } from './user/user.dto';
import { AuthResponseStatus, AuthResponseDto } from './auth/auth.response.dto';


@Controller()
export class AppController {
  constructor(
    private authService: AuthService
    ) {}

  @Post('signup')
  async signUp(@Body() userDto: UserDto): Promise<AuthResponseDto> {
    let signUpStatus = await this.authService.signUp(userDto.username, userDto.password) ? AuthResponseStatus.SUCCESS : AuthResponseStatus.FAILURE
    
    let message: string
    switch (signUpStatus) {
      case AuthResponseStatus.SUCCESS:
        message = "Check you email for confirmation email."
        break;
      case AuthResponseStatus.FAILURE:
        message = "Email may already be in use. Try sign in or using a different email. "
        break;
    }

    return { status: signUpStatus, message: message }
  }

  @Post('login')
  async login(@Body() userDto: UserDto): Promise<AuthResponseDto> {
    let tokens = await this.authService.login(userDto.username, userDto.password)

    let loginStatus = tokens ? AuthResponseStatus.SUCCESS : AuthResponseStatus.FAILURE

    let message: string
    if (loginStatus === AuthResponseStatus.FAILURE) message = "Incorrect password or email given. Try again"

    return { status: loginStatus, data: tokens, message}
  }

  @Post('guard')
  @UseGuards(ResourceAuthGuard)
  verifyAccess(@Req() req: Request): Promise<string> {
    return req['user']
  }

  @Post('refresh')
  @Verify('refresh')
  @UseGuards(ResourceAuthGuard)
  async verifyRefresh(@Req() req: Request): Promise<AuthResponseDto> {    
    if (!req['tokens']) {
      throw new UnauthorizedException()
    }

    return { status: AuthResponseStatus.SUCCESS, data: req['tokens']}
  }

}
