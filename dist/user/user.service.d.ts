import { User } from "./user.entity";
export declare class UserService {
    database: Map<string, User>;
    constructor();
    retrieve(username: string): Promise<User | null>;
    create(username: string, password: string): Promise<User>;
    delete(username: string): Promise<boolean>;
}
