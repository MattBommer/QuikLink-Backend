import { Column, ManyToOne, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { User } from 'src/user/user.entity';

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