import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { MockUserService, UserService } from '../user/user.service';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const UserServiceProvider = {
      provide: UserService,
      useClass: MockUserService
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UserServiceProvider],
    })
    .compile();

    authService = module.get<AuthService>(AuthService);

    await authService.createUser("clamp", "agreAtPsswor2d")
  });

  //TODO: after you have all these failing, switch them on so they work correctly.

  describe('validateUser', () => {
    it('when user exist and password is valid', async () => {
      expect(await authService.validateUser("clamp", "agreAtPsswor2d")).toBe(true);
    });

    it('when user exist and password is invalid', async () => {
      expect(await authService.validateUser("clamp", "agoahtabd")).toBe(false);
    });

    it('when user doesn\'t exist', async () => {
      expect(await authService.validateUser("user3940", "grappbleToyand32sl")).toBe(false);
    });
  })

  
  describe('createUser', () => {
    it('when user exist', async () => {
      expect(await authService.createUser("clamp", "newPassword")).toBe(false);
    });

    it('when user isn\'t in the system', async () => {
      expect(await authService.createUser("flamBam", "wildAgouti3@53bee")).toBe(true);
    });
  })
});
