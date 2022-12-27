import { IsNotEmpty, IsDefined } from 'class-validator';

export class UserDto {
    @IsNotEmpty()
    @IsDefined()
    username: string;

    @IsNotEmpty()
    @IsDefined()
    password: string
}