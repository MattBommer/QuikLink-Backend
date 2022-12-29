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
    it('when valid access token given', async () => {
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

    it('when invalid access token given', async () => {
        const mockCtx = createMock<ExecutionContext> ({
            switchToHttp: () => ({
                getRequest: () => ({
                    headers: {
                        'authorization': "bearer access21"
                    }
                })
            })
        })
        
        expect(await guard.canActivate(mockCtx)).toBe(false)
    })

    it('when valid refresh token given', async () => {
        const mockCtx = createMock<ExecutionContext> ({
            switchToHttp: () => ({
                getRequest: () => ({
                    headers: {
                        'authorization': "bearer refresh"
                    }
                })
            })
        })

        const mockReflector = createMock<Reflector> ({
            get: () => { return 'refresh' } 
        })

        guard = new ResourceAuthGuard(authService, mockReflector)

        expect(await guard.canActivate(mockCtx)).toBe(true)
     }) 

     it('when invalid refresh token given', async () => {
        const mockCtx = createMock<ExecutionContext> ({
            switchToHttp: () => ({
                getRequest: () => ({
                    headers: {
                        'authorization': "bearer refreshw34r"
                    }
                })
            })
        })

        const mockReflector = createMock<Reflector> ({
            get: () => { return 'refresh' } 
        })

        guard = new ResourceAuthGuard(authService, mockReflector)

        expect(await guard.canActivate(mockCtx)).toBe(false)
     })
}) 
});