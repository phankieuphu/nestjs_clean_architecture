import {
  IGroupPleasanterRepository,
  IGroupPleasanterServiceRepository,
} from 'src/interfaces';
import { Mocked, vitest } from 'vitest';

export const groupPleasanterServiceMock =
  (): Mocked<IGroupPleasanterRepository> => {
    return {
      create: vitest.fn(),
      getList: vitest.fn(),
      getDetail: vitest.fn(),
      deleteServiceNotInList: vitest.fn(),
      insertServiceInList: vitest.fn(),
      checkExistGroupName: vitest.fn(),
      updateGroupName: vitest.fn(),
      delete: vitest.fn(),
    };
  };

export const groupPleasanterServiceRepositoryMock =
  (): Mocked<IGroupPleasanterServiceRepository> => {
    return {
      deleteServiceNotInList: vitest.fn(),
      insertServiceInList: vitest.fn(),
      getListServices: vitest.fn(),
    };
  };
