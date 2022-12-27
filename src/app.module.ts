import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    // type: 'mssql',
    // host: process.env.HOSTNAME,
    // port: 1433,
    // username: process.env.USERNAME,
    // password: process.env.PASSWORD,
    // database: process.env.DATABASE,
    // entities: [User],
    // synchronize: true
    // }),
    ConfigModule.forRoot(),
    AuthModule,
    UserModule],
    controllers: [AppController],
    providers: []
})
export class AppModule {}
