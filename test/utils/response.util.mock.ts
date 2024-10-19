import { Mocked, vi } from 'vitest';
import { ResponseUtils } from 'src/utils';

export const responseUtilsMock: Mocked<Partial<ResponseUtils>> = {
  success: vi.fn(),
  failed: vi.fn(),
  successWithScim: vi.fn(),
};

