import { Module } from '@nestjs/common';
import { UserDto } from './user.dto';
import { User } from './user.entity';
import { MockUserService, UserService } from './user.service';

@Module({
  providers: [
    {
      provide: UserService,
      useClass: MockUserService
    }, 
    UserDto, 
    User],
  exports: [UserService, UserDto, User]
})
export class UserModule {}
