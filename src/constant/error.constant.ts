import { HttpStatusCode } from 'axios';

export const StatusMessages = {
  [HttpStatusCode.Ok]: 'OK',
  [HttpStatusCode.Created]: 'Created',
  [HttpStatusCode.NoContent]: 'No Content',

  [HttpStatusCode.BadRequest]: 'Bad Request',
  [HttpStatusCode.Unauthorized]: 'Unauthorized',
  [HttpStatusCode.Forbidden]: 'Forbidden',
  [HttpStatusCode.BadGateway]: 'Bad Gateway',

  [HttpStatusCode.Conflict]: 'Conflict',
  [HttpStatusCode.InternalServerError]: 'Internal Server Error',
  [HttpStatusCode.NotFound]: 'Not Found',

  // Add more status codes as needed
};

export const getStatusCodeMessage = (statusCode: number): string => {
  return StatusMessages[statusCode] || 'Success';
};

export const ErrorMessages = {
  SUCCESS: 'Success',
  EMAIL_EXISTS: 'Email already exists',
  USER_NOT_FOUND: 'User not found',
  EXPIRED_TIME: 'EXPIRED_TIME',
};
