import { Column, ManyToOne, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { IsNotEmpty, IsDefined } from 'class-validator';
import { User } from 'src/user/user.entity';

@Entity()
export class RssFeed {
    
    @PrimaryGeneratedColumn('uuid')
    @IsNotEmpty()
    @IsDefined()
    resourceId: string
    
    @Column()
    @IsNotEmpty()
    @IsDefined()
    url: string
    
    @Column()
    @IsNotEmpty()
    @IsDefined()
    title: string

    @Column({ nullable: true })
    description?: string

    @Column({ nullable: true })
    imageURL?: string

    @ManyToOne(() => User)
    user: string
}