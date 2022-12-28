import { AuthService } from './auth/auth.service';
import { UserDto } from './user/user.dto';
import { AuthResponseDto } from './auth/auth.response.dto';
export declare class AppController {
    private authService;
    constructor(authService: AuthService);
    signUp(userDto: UserDto): Promise<AuthResponseDto>;
    login(userDto: UserDto): Promise<AuthResponseDto>;
    verifyAccess(req: Request): Promise<string>;
    verifyRefresh(req: Request): Promise<AuthResponseDto>;
}
