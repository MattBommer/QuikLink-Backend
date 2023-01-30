import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { AccessTokenModule } from 'src/token/access.token.module';
import { RefreshTokenModule } from 'src/token/refresh.token.module';
import { ResourceAuthGuard } from './auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UserModule, AccessTokenModule, RefreshTokenModule, JwtModule],
  providers: [AuthService, ResourceAuthGuard],
  exports: [AuthService, ResourceAuthGuard, JwtModule]
})
export class AuthModule {}
