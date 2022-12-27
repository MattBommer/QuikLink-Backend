import { Module } from '@nestjs/common';
import { UserDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  providers: [UserService, UserDto, User],
  exports: [UserService, UserDto, User]
})
export class UserModule {}
