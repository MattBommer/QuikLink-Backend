import { AuthService } from './auth/auth.service';
import { AuthTokensDto } from './auth/auth.tokens.dto';
import { UserDto } from './user/user.dto';
declare class TokenDto {
    token: string;
}
export declare class AppController {
    private authService;
    constructor(authService: AuthService);
    signUp(userDto: UserDto): Promise<boolean>;
    login(userDto: UserDto): Promise<AuthTokensDto | undefined>;
    verifyAccess(tokenDto: TokenDto): Promise<string>;
    verifyRefresh(tokenDto: TokenDto): Promise<AuthTokensDto>;
}
export {};
