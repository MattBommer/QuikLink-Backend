import { Test, TestingModule } from '@nestjs/testing';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { ExecutionContext, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResourceAuthGuard } from './auth.guard';
import { Reflector } from '@nestjs/core';

describe('ResourceAuthGuard', () => {
    let authService: AuthService
    let guard: ResourceAuthGuard

  beforeEach(async () => {
    authService = createMock<AuthService> ({
        verifyAccessToken: (access_token) => { return new Promise((resolve) => resolve(access_token === 'access' ? 'claptrap' : undefined))},
        verifyRefreshToken: (refresh_token) => { return new Promise((resolve) => resolve(refresh_token === 'refresh' ? {access_token: "access", refresh_token: "refresh"} : undefined))}
    })

    guard = new ResourceAuthGuard(authService, new Reflector())
  });

  describe('ResourceAuthGuard', () => {
    it('when authorization header is not set', async () => {
        const mockCtx = createMock<ExecutionContext> ({
            switchToHttp: () => ({
                getRequest: () => ({
                    headers: {}
                })
            })
        })

        expect(await guard.canActivate(mockCtx)).toBe(false)
    })

    it('when verification method isn\'t set', async () => {
        const mockCtx = createMock<ExecutionContext> ({
            switchToHttp: () => ({
                getRequest: () => ({
                    headers: {
                        'authorization': "bearer access"
                    }
                })
            })
        })
        
        expect(await guard.canActivate(mockCtx)).toBe(true)
    })

    it('when verification method isn\'t set properly', async () => {
        let mockCtx = createMock<ExecutionContext> ({
            switchToHttp: () => ({
                getRequest: () => ({
                    headers: {
                        'authorization': "bearer refresh"
                    }
                })
            })
        })
        
        expect(await guard.canActivate(mockCtx)).toBe(false)

        mockCtx = createMock<ExecutionContext> ({
            switchToHttp: () => ({
                getRequest: () => ({
                    headers: {
                        'authorization': "bearer access"
                    }
                })
            })
        })

        let mockReflector = createMock<Reflector> ({
            get: () => { return 'refresh' } 
        })

        guard = new ResourceAuthGuard(authService, mockReflector)
        
        expect(await guard.canActivate(mockCtx)).toBe(false)
    })

     it('when verification method is set properly', async () => {
        let mockCtx = createMock<ExecutionContext> ({
            switchToHttp: () => ({
                getRequest: () => ({
                    headers: {
                        'authorization': "bearer refresh"
                    }
                })
            })
        })

        let mockReflector = createMock<Reflector> ({
            get: () => { return 'refresh' } 
        })

        guard = new ResourceAuthGuard(authService, mockReflector)

        expect(await guard.canActivate(mockCtx)).toBe(true)

        mockCtx = createMock<ExecutionContext> ({
            switchToHttp: () => ({
                getRequest: () => ({
                    headers: {
                        'authorization': "bearer access"
                    }
                })
            })
        })

        mockReflector = createMock<Reflector> ({
            get: () => { return 'access' } 
        })

        guard = new ResourceAuthGuard(authService, mockReflector)

        expect(await guard.canActivate(mockCtx)).toBe(true)
     })

     it('when authorization header is formated incorrectly', async () => {
        const mockCtxWrongDelimiter = createMock<ExecutionContext> ({
            switchToHttp: () => ({
                getRequest: () => ({
                    headers: {
                        'authorization': "bearer-access"
                    }
                })
            })
        })

        const mockCtxWrongAuthType = createMock<ExecutionContext> ({
            switchToHttp: () => ({
                getRequest: () => ({
                    headers: {
                        'authorization': "basic access"
                    }
                })
            })
        })

        const mockCtxInvalidTokenSyntax = createMock<ExecutionContext> ({
            switchToHttp: () => ({
                getRequest: () => ({
                    headers: {
                        'authorization': "bearer access token"
                    }
                })
            })
        })

        expect(await guard.canActivate(mockCtxWrongDelimiter)).toBe(false)
        expect(await guard.canActivate(mockCtxWrongAuthType)).toBe(false)
        expect(await guard.canActivate(mockCtxInvalidTokenSyntax)).toBe(false)
     })
}) 
});