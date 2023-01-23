import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class ResourceAuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private reflector: Reflector
    ) {}

  //@ts-ignore
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean | Observable<boolean>> {
    let tokenVerificationType = this.reflector.get<string>('verify', context.getHandler())
    let ctx = context.switchToHttp()
    let request = ctx.getRequest<Request>()
    let tokenHeader = request.headers['authorization'] ?? ""
    let authHeaderArray: string[] = tokenHeader.split(' ')
    let authType = authHeaderArray[0]
    let token = authHeaderArray[1]
    
    if (authHeaderArray.length === 2 && authType.toLowerCase() === 'bearer') {

      console.log(tokenVerificationType)
      switch (tokenVerificationType) {
        case 'refresh':
          let freshAuthTokens = await this.authService.verifyRefreshToken(token)

          if (!freshAuthTokens) {
            throw new UnauthorizedException("Unauthorized: Invalid refresh token")
          }

          request['tokens'] = freshAuthTokens
          break;
        case 'access':
        default:
          let userId = await this.authService.verifyAccessToken(token)
          
          if (!userId) {
            throw new UnauthorizedException("Unauthorized: Invalid access token")
          }

          request['user'] = userId
          break;
      }

      return true
    } 
    
    throw new UnauthorizedException("Unauthorized: Malformed authorization header")
  }
}
