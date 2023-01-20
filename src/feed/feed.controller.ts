import { Body, Controller, Get, Post, UseGuards, Req, BadRequestException, UsePipes } from '@nestjs/common';
import { SchemaValidationPipe } from '../utilities/schema-validation.pipe';
import { FeedService } from './feed.service';
import { ResourceAuthGuard } from '../auth/auth.guard';
import { AddFeedDTO, AddFeedSchema, RemoveFeedDTO, RemoveFeedSchema, RssFeedDTO } from './feed.entity';
import { Request } from 'express';

@Controller('feed')
export class FeedController {
    constructor(
        private feedService: FeedService,
    ) {}

    @Get('fetch')
    @UseGuards(ResourceAuthGuard)
    async feeds(@Req() request: Request): Promise<RssFeedDTO[]> {
        return this.feedService.getFeeds(request['user'])
    }

    @Post('add')
    @UseGuards(ResourceAuthGuard)
    @UsePipes(new SchemaValidationPipe(AddFeedSchema))
    async add(@Req() request: Request, @Body() addFeedDto: AddFeedDTO): Promise<RssFeedDTO> {
        let feed = await this.feedService.add(request['user'], addFeedDto.feedUrl)
        if (!feed) throw new BadRequestException("Invalid rss url given")
        return feed
    }

    @Post('remove')
    @UseGuards(ResourceAuthGuard)
    @UsePipes(new SchemaValidationPipe(RemoveFeedSchema))
    async remove(@Req() request: Request, @Body() removeFeedDto: RemoveFeedDTO): Promise<void> {
        this.feedService.remove(request['user'], removeFeedDto.feedId)
    }
}
