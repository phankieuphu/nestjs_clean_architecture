import { HttpStatusCode } from 'axios';
import { itemServiceDto } from 'src/dtos';
import { GroupPleasanterServiceEntity } from 'src/entities';
import { IGroupServiceDetail } from 'src/interfaces';

export const groupPleasanterServiceStub = {
  groupCreate: Object.freeze({
    name: 'test-name',
  }),

  groupUpdate: Object.freeze({
    id: 'test-id',
    name: 'test-name update',
    list_services: [],
  }),

  group: Object.freeze({
    id: 'test-id',
    name: 'test-name',
    created_by: null,
    updated_by: null,
    deleted_by: null,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
    list_services: [],
  }),

  groupInfo: Object.freeze({
    id: 'test-id',
    name: 'test-name',
    created_by: null,
    updated_by: null,
    deleted_by: null,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
    list_services: [],
  }) as GroupPleasanterServiceEntity,

  groupSearchKey: 'test-key',

  idNotFound: 'test-id-not-found',

  createSuccessResponse: Object.freeze({
    message: 'Created',
    status_code: HttpStatusCode.Created,
  }),

  listGroup: Object.freeze([
    {
      id: 'test-id',
      name: 'test-name',
      created_by: null,
      updated_by: null,
      deleted_by: null,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
      list_services: [],
    },
  ]) as GroupPleasanterServiceEntity[],

  listServices: Object.freeze([
    {
      pleasanter_id: 'test-id',
      name: 'test-name',
      is_send_alert: true,
      is_promotion: true,
    },
  ]) as itemServiceDto[],

  groupDetailNotFound: Object.freeze({
    info: null,
    list_services: [],
  }) as IGroupServiceDetail,
};
