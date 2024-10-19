import { HttpStatusCode } from 'axios';

export const StatusMessages = {
  [HttpStatusCode.Ok]: 'OK',
  [HttpStatusCode.Created]: 'Created',
  [HttpStatusCode.NoContent]: 'No Content',

  [HttpStatusCode.BadRequest]: 'Bad Request',
  [HttpStatusCode.Unauthorized]: 'Unauthorized',
  [HttpStatusCode.Forbidden]: 'Forbidden',
  [HttpStatusCode.BadGateway]: 'BadGateway',

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
  GROUP_NAME_EXITS: 'Group name already exists',
  EMAIL_EXITS: 'Email already exists',
  NOT_EXITS: 'ID Not exits',
  ALERT_NOT_FOUND: 'ALert not found',
  QUESTION_NOT_FOUND: 'Question not found',
  EXPIRED_TIME: 'EXPIRED_TIME',
};
