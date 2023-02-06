import { Body, Controller, Post, UnauthorizedException, UsePipes, BadRequestException, Res } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { CreateUserDto, CreateUserDtoSchema } from './user/user.dto';
import { SchemaValidationPipe } from './utilities/schema-validation.pipe';
import { Response } from 'express';


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
  async login(@Body() createUserDto: CreateUserDto, @Res({ passthrough: true }) response: Response): Promise<void> {
    let tokens = await this.authService.login(createUserDto.username, createUserDto.password)

    if (!tokens) {
      throw new UnauthorizedException("Incorrect password or email given. Try again")
    }

    response.setHeader("access-token", tokens.access)
    response.setHeader("refresh-token", tokens.refresh)
  }
}
