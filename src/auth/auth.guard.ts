import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ResourceAuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService
    ) {}

  //@ts-ignore
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean | Observable<boolean>> {
    let ctx = context.switchToHttp()
    let request = ctx.getRequest<Request>()
    let response = ctx.getResponse<Response>()
    let tokenHeader = request.headers['authorization'] ?? ""
    let authHeaderArray: string[] = tokenHeader.split(' ')
    let authType = authHeaderArray[0]
    let token = authHeaderArray[1]
    
    if (authHeaderArray.length === 2 && authType.toLowerCase() === 'bearer') {
      let decoded = this.jwtService.decode(token)
      let tokenVerificationType = decoded['type']
      var userId = decoded['sub']

      switch (tokenVerificationType) {
        case 'refresh':
          try {
            let freshAuthTokens = await this.authService.verifyRefreshToken(token)
            response.setHeader("access-token", freshAuthTokens.access)
            response.setHeader("refresh-token", freshAuthTokens.refresh)
          } catch {
            throw new UnauthorizedException("Unauthorized: Invalid refresh token")
          }
          break;
        case 'access':
          try {
            await this.authService.verifyAccessToken(token)
          } catch {
            throw new UnauthorizedException("Unauthorized: Invalid access token")
          }
          break;
        default:
          throw new UnauthorizedException("Unauthorized: Invalid token payload")
      }
      request['user'] = userId
      return true
    } 
    
    throw new UnauthorizedException("Unauthorized: Malformed authorization header")
  }
}
