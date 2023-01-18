import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { FeedService } from './feed.service';
import { ResourceAuthGuard } from '../auth/auth.guard';
import { RssFeed } from './feed.entity';
import { Request } from 'express';

@Controller('feed')
export class FeedController {
    constructor(
        private feedService: FeedService,
    ) {}

    @Get('fetch')
    @UseGuards(ResourceAuthGuard)
    async feeds(@Req() request: Request): Promise<RssFeed[]> {
        return this.feedService.getFeeds(request['user'])
    }

    @Post('add')
    @UseGuards(ResourceAuthGuard)
    // Add input validation here
    async add(@Req() request: Request, @Body() createFeedDto: { feedUrl: string }): Promise<string> {
        return this.feedService.add(request['user'], createFeedDto.feedUrl)
    }

    @Post('remove')
    @UseGuards(ResourceAuthGuard)
    // Add input validation here
    async remove(@Req() request: Request, @Body() removeFeedDto: { feedId: string }): Promise<boolean> {
        return this.feedService.remove(request['user'], removeFeedDto.feedId)
    }
}
