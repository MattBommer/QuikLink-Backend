import { Repository } from "typeorm";
import { User } from "./user.entity";
export declare class UserService {
    private userRepo;
    constructor(userRepo: Repository<User>);
    create(username: string, password: string): Promise<User>;
    retrieve(username: string): Promise<User | null>;
    update(user: User): Promise<void>;
    delete(user: User): Promise<boolean>;
}
export declare class MockUserService {
    database: Map<string, User>;
    constructor();
    retrieve(username: string): Promise<User | null>;
    create(username: string, password: string): Promise<User>;
    delete(username: string): Promise<boolean>;
}
