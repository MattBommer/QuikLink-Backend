import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { AccessTokenModule } from 'src/token/access.token.module';
import { RefreshTokenModule } from 'src/token/refresh.token.module';

@Module({
  imports: [UserModule, AccessTokenModule, RefreshTokenModule],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
