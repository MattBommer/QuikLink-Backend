import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class ResourceAuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private reflector: Reflector
    ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    let tokenVerificationType = this.reflector.get<string>('verify', context.getHandler()) ?? "access"
    let ctx = context.switchToHttp()
    let request = ctx.getRequest<Request>()
    let tokenHeader = request.headers['authorization'] ?? ""
    let authHeaderArray: string[] = tokenHeader.split(' ')
    let authType = authHeaderArray[0]
    let token = authHeaderArray[1]
    
    if (authHeaderArray.length === 2, authType.toLowerCase() === 'bearer') {

      switch (tokenVerificationType) {
        case 'access':
          return this.authService.verifyAccessToken(token).then((username) => {
            request['user'] = username
            return (username !== undefined)
          })
        case 'refresh':
          return this.authService.verifyRefreshToken(token).then((tokens) => {
            request['tokens'] = tokens
            return (tokens !== undefined)
          })
      }
    } 
    
    return false
  }
}
