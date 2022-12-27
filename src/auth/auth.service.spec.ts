import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { MockUserService, UserService } from '../user/user.service';
import { MockRefreshJWTRedisService, RefreshJWTRedisService } from '../token/refresh.token.redis.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const UserServiceProvider = {
      provide: UserService,
      useClass: MockUserService
    }

    const RefreshJWTServiceProvider = {
      provide: 'RefreshJWTService',
      useFactory: () => {
        return new JwtService({
            secret: 'fakesecret',
            signOptions: { expiresIn: '3s'},
            // @ts-ignore
            verifyOptions: { type: 'refresh'}
        })
      }
    }
    

    const AccessJWTServiceProvider = {
      provide: 'AccessJWTService',
      useFactory: () => {
        return new JwtService({
            secret: 'fakesecret2',
            signOptions: { expiresIn: '3s'},
            // @ts-ignore
            verifyOptions: { type: 'access'}
        })
      }
    }

    const RefreshJWTRedisServiceProvider = {
      provide: RefreshJWTRedisService,
      useClass: MockRefreshJWTRedisService
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UserServiceProvider, RefreshJWTRedisServiceProvider, RefreshJWTServiceProvider, AccessJWTServiceProvider],
    })
    .compile();

    authService = module.get<AuthService>(AuthService);


    await authService.signUp("clamp", "agreAtPsswor2d")
  });

  describe('signUp', () => {
    it('when user doesn\'t exist', async () => {
      expect(await authService.signUp("SnapPeet", "blamedFord!nner")).toBe(true);
    });

    it('when user exists', async () => {
      expect(await authService.signUp("clamp", "agreAtPsswor2d")).toBe(false);
    });
  })

  
  describe('login', () => {
    it('when user exist', async () => {
      let tokens = await authService.login("clamp", "agreAtPsswor2d")
      expect(tokens).toBeDefined();
      expect(tokens.access_token).toBeDefined();
      expect(tokens.refresh_token).toBeDefined();
    });

    it('when user isn\'t in the system', async () => {
      expect(await authService.login("flamBam", "wildAgouti3@53bee")).toBeUndefined();
    });

    it('when user provides the right username but wrong password', async () => {
      expect(await authService.login("clamp", "snappleDr4nk")).toBeUndefined();
    });
  })
});
