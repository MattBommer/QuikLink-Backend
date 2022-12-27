import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AuthTokensDto } from './auth/auth.tokens.dto';
import { UserDto } from './user/user.dto';

class TokenDto {
  token: string
}

@Controller()
export class AppController {
  constructor(
    private authService: AuthService
    ) {}

  @Post('signup')
  async signUp(@Body() userDto: UserDto): Promise<boolean> {
    return this.authService.signUp(userDto.username, userDto.password)
  }

  @Post('login')
  login(@Body() userDto: UserDto): Promise<AuthTokensDto | undefined> {
    return this.authService.login(userDto.username, userDto.password)
  }

  @Post('verify/access')
  verifyAccess(@Body() tokenDto: TokenDto): Promise<string> {
    return this.authService.verifyAccessToken(tokenDto.token)
  }

  @Post('verify/refresh')
  verifyRefresh(@Body() tokenDto: TokenDto): Promise<AuthTokensDto> {
    return this.authService.verifyRefreshToken(tokenDto.token)
  }

}
