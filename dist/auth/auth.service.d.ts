import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthTokensDto } from './auth.tokens.dto';
import { MockRefreshJWTRedisService } from 'src/token/refresh.token.redis.service';
export declare class AuthService {
    private userService;
    private refreshJWTRedisService;
    private refreshJWTService;
    private accessJWTService;
    constructor(userService: UserService, refreshJWTRedisService: MockRefreshJWTRedisService, refreshJWTService: JwtService, accessJWTService: JwtService);
    login(username: string, password: string): Promise<AuthTokensDto | undefined>;
    signUp(username: string, password: string): Promise<boolean>;
    private _generateTokens;
    verifyAccessToken(access_token: string): Promise<string>;
    verifyRefreshToken(refreshToken: string): Promise<AuthTokensDto>;
}
