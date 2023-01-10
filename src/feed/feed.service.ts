import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { RssFeed } from "./feed.entity";
import { RssService } from './rss.service';
import * as crypto from 'crypto'

@Injectable()
export class FeedService {
    constructor(
        @InjectRepository(RssFeed)
        private feedRepo: Repository<RssFeed>,
        private rssService: RssService
    ) {}

    async getFeeds(ids: [string]): Promise<RssFeed[]> {
        // get all feeds that a user has subbed too
        let feedIds = ids.map((feedId) => ({ resourceId: feedId }))
        return this.feedRepo.find({
            where: feedIds
        })
    }

    // Verify RSS url and add it if it's real
    // Return the id for the feed
    async add(userId: string, url: string): Promise<string | undefined> {
        let feed = await this.rssService.validate(url)
        if (feed) {
            let uuid = crypto.randomUUID()
            let feedMetaData = this.feedRepo.create({ 
                resourceId: uuid, 
                title: feed.title,
                description: feed.description,
                url: url,
                imageURL: feed.image?.url,
                user: userId
            })
            await this.feedRepo.save(feedMetaData)
            return uuid
        }
    }

    async remove(feed: RssFeed): Promise<boolean> {
        let results = await this.feedRepo.delete(feed)
        return results.affected == 1
    }

    async update(feed: RssFeed) {
        await this.feedRepo.update(feed.resourceId, feed)
    }
}
