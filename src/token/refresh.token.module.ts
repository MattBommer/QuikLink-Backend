import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MockRefreshJWTRedisService } from './refresh.token.redis.service';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('REFRESH_JWT_SECRET'),
        signOptions: { expiresIn: '7d', issuer: 'skate-bst'},
        verifyOptions: { type: 'refresh', issuer: 'skate-bst' }
      }),
      inject: [ConfigService]
      }
    )
  ],
  providers: [
    {
      provide: 'RefreshJWTService',
      useExisting: JwtService
    },
    MockRefreshJWTRedisService
],
  exports: ['RefreshJWTService', MockRefreshJWTRedisService]
})
export class RefreshTokenModule {}
