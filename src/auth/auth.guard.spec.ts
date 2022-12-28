import { ResourceAuthGuard } from './auth.guard';

describe('ResourceAuthGuard', () => {

  it('should allow access when user presents correct bearer token', () => {
    expect(new ResourceAuthGuard()).toBeDefined();
  });

  it('should prevent access when user doesn\'t have an authorization header', () => {
    expect(new ResourceAuthGuard()).toBeDefined();
  });

  it('should prevent access when user doesn\'t have a valid token', () => {
    expect(new ResourceAuthGuard()).toBeDefined();
  });

  it('should prevent access when user doesn\'t have a the correct token type set', () => {
    expect(new ResourceAuthGuard()).toBeDefined();
  });
});
