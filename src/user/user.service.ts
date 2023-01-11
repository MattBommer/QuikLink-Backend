import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
    ) {}

    async create(username: string, password: string): Promise<User> {
        let newUser = this.userRepo.create({ username: username, password: password })
        return this.userRepo.save(newUser)
    }

    async retrieve(username: string): Promise<User | null> {
        return this.userRepo.findOneBy({ username: username })
    }

    async update(user: User): Promise<void> {
        await this.userRepo.update(user.id, user)
    }

    async delete(user: User): Promise<boolean> {
        let result = await this.userRepo.delete(user)
        return result.affected === 1
    }
}

// A mocked version of UserService for testing purposes
@Injectable()
export class MockUserService {
    database: Map<string, User>

    constructor() {
        this.database = new Map<string, User>
    }

    async retrieve(username: string): Promise<User | null> { 
        return this.database.get(username) ?? null
    }

    async create(username: string, password: string): Promise<User> {
        this.database.set(username, {id: username, username: username, password: password})
        return this.database[username]
    }

    async delete(username: string): Promise<boolean> {
        return this.database.delete(username)
    }
}