import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RssFeed } from './feed.entity';
import { FeedService } from './feed.service';
import { RssService } from './rss.service';
import { FeedController } from './feed.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([RssFeed]), AuthModule],
  providers: [FeedService, RssService],
  controllers: [FeedController]
})
export class FeedModule {}
