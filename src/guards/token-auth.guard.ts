import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import config from 'src/config/env.config';

@Injectable()
export class TokenAuthGuard implements CanActivate {
  /**
   * Checks if the provided token in the request headers matches the expected token from the environment variable.
   *
   * @param {ExecutionContext} context - The execution context object.
   * @return {boolean} Returns true if the token matches, otherwise throws an HttpException with status code 401 (Unauthorized).
   */
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const providedToken = request.headers['x-api-key'];
    const expectedToken = config.AUTH.API_KEY;

    // Reject when AUTH_TOKEN is not configured, otherwise a missing header would match `undefined`
    if (expectedToken && providedToken === expectedToken) {
      return true;
    }
    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
  }
}
