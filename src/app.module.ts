import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { FeedModule } from './feed/feed.module';
import { RssFeed } from './feed/feed.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
    //@ts-ignore
    type: process.env.TYPE,
    host: process.env.HOSTNAME,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    entities: [User, RssFeed],
    synchronize: true
    }),
    AuthModule,
    UserModule,
    FeedModule],
    controllers: [AppController],
    providers: []
})
export class AppModule {}
