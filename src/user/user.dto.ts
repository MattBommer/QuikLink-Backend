import { IsNotEmpty, IsDefined } from 'class-validator';
import * as Joi from 'joi';

export class CreateUserDto {
    username: string;
    password: string
}

export const CreateUserDtoSchema = Joi.object().keys({
    username: Joi.string().email().required(),
    password: Joi.string().min(8).max(254).required()
})