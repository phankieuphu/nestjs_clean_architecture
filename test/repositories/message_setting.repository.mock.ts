import { vitest } from 'vitest';

export const newMessageSettingMock = () => {
  return {
    create: vitest.fn(),
    getList: vitest.fn(),
    getDetail: vitest.fn(),
    delete: vitest.fn(),
    update: vitest.fn(),
    findByType: vitest.fn(),
  };
};
