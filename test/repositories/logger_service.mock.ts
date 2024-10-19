import { ServiceLogger } from 'src/services';
import { Mocked, vitest } from 'vitest';

export const loggerServiceMock = () => {
  return {
    error: vitest.fn(),
    warn: vitest.fn(),
    log: vitest.fn(),
    debug: vitest.fn(),
  };
};
