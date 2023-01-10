import { Injectable } from "@nestjs/common";
import * as RssParser from "rss-parser"

@Injectable()
export class RssService {
    async validate(url: string): Promise<{ [key: string]: any; } | undefined> {
        try {
            let parser = new RssParser()
            let feed = await parser.parseURL(url)
            return feed
        } catch {}
    }
}