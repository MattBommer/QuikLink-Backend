import { Body, Req, Controller, Post, UseGuards, UnauthorizedException, UsePipes, BadRequestException } from '@nestjs/common';
import { ResourceAuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { Verify } from './auth/verify.decorator';
import { CreateUserDto, CreateUserDtoSchema } from './user/user.dto';
import { AuthResponseStatus, AuthResponseDto } from './auth/auth.response.dto';
import { SchemaValidationPipe } from './utilities/schema-validation.pipe';
import { AuthTokensDto } from './auth/auth.tokens.dto';


@Controller()
export class AppController {
  constructor(
    private authService: AuthService
    ) {}

  @Post('signup')
  @UsePipes(new SchemaValidationPipe(CreateUserDtoSchema))
  async signUp(@Body() createUserDto: CreateUserDto): Promise<{message: String}> {
    let signUpSuccessful = await this.authService.signUp(createUserDto.username, createUserDto.password)
    
    if (!signUpSuccessful) {
      throw new BadRequestException("Email may already be in use. Try sign in or using a different email.")
    }

    return { message: "Check you email for confirmation email." }
  }

  @Post('login')
  @UsePipes(new SchemaValidationPipe(CreateUserDtoSchema))
  async login(@Body() createUserDto: CreateUserDto): Promise<AuthTokensDto> {
    let tokens = await this.authService.login(createUserDto.username, createUserDto.password)

    if (!tokens) {
      throw new UnauthorizedException("Incorrect password or email given. Try again")
    }

    return tokens
  }

  @Post('refresh')
  @Verify('refresh')
  @UseGuards(ResourceAuthGuard)
  async verifyRefresh(@Req() req: Request): Promise<AuthTokensDto> {
    return req['tokens']
  }

}
