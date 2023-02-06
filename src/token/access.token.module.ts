import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
          return {
            secret: configService.get<string>('accessJwtSecret'),
            signOptions: { expiresIn: '15m', issuer: 'skate-bst' },
            verifyOptions: { type: 'access', issuer: 'skate-bst' }
          }
        },
      inject: [ConfigService]
      }
    )
  ],
  providers: [{
    provide: 'AccessJWTService',
    useExisting: JwtService
  }],
  exports: ['AccessJWTService']
})
export class AccessTokenModule {}