import { Column, ManyToOne, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { User } from 'src/user/user.entity';
import * as Joi from 'joi';

@Entity()
export class RssFeed { 
    @PrimaryGeneratedColumn('uuid')
    resourceId: string
    
    @Column()
    url: string
    
    @Column()
    title: string

    @Column({ nullable: true })
    description?: string

    @Column({ nullable: true })
    imageURL?: string

    @ManyToOne(() => User)
    user: string
}
export class RssFeedDTO { 
    resourceId: string    
    url: string
    title: string
    description?: string
    imageURL?: string
}

export class AddFeedDTO { 
    feedUrl: string
}

export class RemoveFeedDTO { 
    feedId: string
}

export const AddFeedSchema = Joi.object().keys({
    feedUrl: Joi.string().uri().required(),
})

export const RemoveFeedSchema = Joi.object().keys({
    feedId: Joi.string().uuid().required(),
})