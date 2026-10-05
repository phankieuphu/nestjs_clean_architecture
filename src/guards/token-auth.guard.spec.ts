import { ExecutionContext, HttpException } from '@nestjs/common';
import config from 'src/config/env.config';
import { TokenAuthGuard } from './token-auth.guard';

const createContext = (apiKey?: string) =>
  ({
    switchToHttp: () => ({
      getRequest: () => ({ headers: { 'x-api-key': apiKey } }),
    }),
  }) as unknown as ExecutionContext;

describe('TokenAuthGuard', () => {
  const guard = new TokenAuthGuard();
  const original = config.AUTH.API_KEY;

  afterEach(() => {
    config.AUTH.API_KEY = original;
  });

  it('allows a matching api key', () => {
    config.AUTH.API_KEY = 'secret';
    expect(guard.canActivate(createContext('secret'))).toBe(true);
  });

  it('rejects a wrong api key', () => {
    config.AUTH.API_KEY = 'secret';
    expect(() => guard.canActivate(createContext('wrong'))).toThrow(
      HttpException,
    );
  });

  it('rejects when AUTH_TOKEN is not configured', () => {
    config.AUTH.API_KEY = undefined;
    expect(() => guard.canActivate(createContext())).toThrow(HttpException);
  });
});
