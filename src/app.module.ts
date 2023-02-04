import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FeedModule } from './feed/feed.module';
import { RssFeed } from './feed/feed.entity';
import { localConfig, prodConfig} from './config/configuration'

//TODO add a way to run things locally or in prod.
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [localConfig]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get<any>('database'),
        entities: [User, RssFeed],
        synchronize: true
      })
    }),
    AuthModule,
    UserModule,
    FeedModule],
    controllers: [AppController],
    providers: []
})
export class AppModule {}
