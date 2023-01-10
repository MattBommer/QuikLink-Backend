import { Body, Request, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { FeedService } from './feed.service';
import { ResourceAuthGuard } from '../auth/auth.guard';
import { RssFeed } from './feed.entity';

@Controller('feed')
export class FeedController {
    constructor(
        private feedService: FeedService,
    ) {}

    @Post('fetch')
    @UseGuards(ResourceAuthGuard)
    async feeds(@Body() body: Body): Promise<RssFeed[]> {
        return this.feedService.getFeeds(body['feedIds'])
    }

    @Post('add')
    @UseGuards(ResourceAuthGuard)
    async add(@Req() request: Request, @Body() body: Body): Promise<string> {
        return this.feedService.add(request['user'], body['feedUrl'])
    }

    @Post('remove')
    @UseGuards(ResourceAuthGuard)
    async remove(@Body() body: Body): Promise<boolean> {
        return this.feedService.remove(body['feed'])
    }

    @Post('update')
    @UseGuards(ResourceAuthGuard)
    async update(@Body() body: Body): Promise<void> {
        let json = await body.json()
        this.feedService.update(body['feed'])
    }
}
