import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { RssFeed, RssFeedDTO } from "./feed.entity";
import { RssService } from './rss.service';

@Injectable()
export class FeedService {
    constructor(
        @InjectRepository(RssFeed)
        private feedRepo: Repository<RssFeed>,
        private rssService: RssService
    ) {}

    async getFeeds(user: string): Promise<RssFeedDTO[]> {
        let feeds = await this.feedRepo.find({
            //@ts-ignore
            where: { user: { id : user } }
           })

        return feeds.map((feed) => this.castFeedToDTO(feed))
    }

    async add(userId: string, url: string): Promise<RssFeedDTO | undefined> {
        let feed = await this.rssService.validate(url)
        if (feed) {
            let feedEntry = this.feedRepo.create({ 
                title: feed.title,
                description: feed.description,
                url: url,
                imageURL: feed.image?.url,
                user: userId
            })
            await this.feedRepo.save(feedEntry)
            return this.castFeedToDTO(feedEntry)
        }
    }

    async remove(user: string, resourceId: string): Promise<void> {
        let feeds = await this.feedRepo.find({
            //@ts-ignore
            where: { user: { id: user },
                     resourceId: resourceId }
        })

        if (feeds.length === 1) {
            await this.feedRepo.remove(feeds)
        }
    }

    private castFeedToDTO(feed: RssFeed): RssFeedDTO {
        const { user, ...feedMetaData} = feed
        return feedMetaData
    }
}
