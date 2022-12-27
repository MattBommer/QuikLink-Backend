import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsDefined } from 'class-validator';

export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    @IsDefined()
    username: string;

    @Column()
    @IsNotEmpty()
    @IsDefined()
    password: string
}