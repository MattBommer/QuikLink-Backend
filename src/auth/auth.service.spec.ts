import { Test, TestingModule } from '@nestjs/testing';
import { HttpException } from '@nestjs/common'
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
            signOptions: { expiresIn: '4s'},
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
            signOptions: { expiresIn: '2s'},
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

  describe('verifyAccessToken', () => {
    it('when access token is valid', async () => {
      let tokens = await authService.login("clamp", "agreAtPsswor2d")
      expect(await authService.verifyAccessToken(tokens.access_token)).toBe('clamp')
    })

    it('when access token is invalid', async () => {
      let tokens = await authService.login("clamp", "agreAtPsswor2d")
      let access_token = tokens.access_token
      let abridged_access_token = access_token.slice(0, access_token.length - 3)
      await expect(authService.verifyAccessToken(abridged_access_token)).rejects.toThrow()
    })

    it('when access token is expired', async () => {
      let tokens = await authService.login("clamp", "agreAtPsswor2d")
      await new Promise(r => setTimeout(r, 2000)); // sleep 2 secs
      await expect(authService.verifyAccessToken(tokens.access_token)).rejects.toThrow()
    })

    it('when refresh token is given', async () => {
      let tokens = await authService.login("clamp", "agreAtPsswor2d")
      await expect(authService.verifyAccessToken(tokens.refresh_token)).rejects.toThrow()
    })
  })

  describe('verifyRefreshToken', () => {
    it('when refresh token is valid', async () => {
      let tokens = await authService.login("clamp", "agreAtPsswor2d")
      let newTokens = await authService.verifyRefreshToken(tokens.refresh_token)
      expect(newTokens).toBeDefined();
      expect(newTokens.access_token).toBeDefined();
      expect(newTokens.refresh_token).toBeDefined();
    })

    it('when refresh token is invalid', async () => {
      let tokens = await authService.login("clamp", "agreAtPsswor2d")
      let refresh_token = tokens.refresh_token
      let abridged_refresh_token = refresh_token.slice(0, refresh_token.length - 3)
      await expect(authService.verifyAccessToken(abridged_refresh_token)).rejects.toThrow()
    })

    it('when refresh token is expired', async () => {
      let tokens = await authService.login("clamp", "agreAtPsswor2d")
      await new Promise(r => setTimeout(r, 4000)); // sleep 4 secs
      await expect(authService.verifyRefreshToken(tokens.refresh_token)).rejects.toThrow()
    })

    it('when access token is given', async () => {
      let tokens = await authService.login("clamp", "agreAtPsswor2d")
      await expect(authService.verifyRefreshToken(tokens.access_token)).rejects.toThrow()
    })
  })
});