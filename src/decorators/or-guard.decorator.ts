import { SetMetadata } from '@nestjs/common';

export const OR_GUARDS_KEY = 'orGuards';
export const OrGuards = (...guards: any[]) =>
  SetMetadata(OR_GUARDS_KEY, guards);
