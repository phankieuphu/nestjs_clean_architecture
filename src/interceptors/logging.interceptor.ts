import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, ip } = request;
    const now = Date.now();
    let notHealthCheck = true;

    if (url == '/health-check') {
      notHealthCheck = false;
    }
    if (notHealthCheck == true) {
      this.logger.log(
        `Incoming request ${ip} - ${method} - ${url} - ${context.getClass().name}  -  ${context.getHandler().name} -  ${JSON.stringify(request.body)}`,
      );
    }
    return next.handle().pipe(
      tap(() => {
        if (notHealthCheck) {
          this.logger.log(
            `${method} ${url} - Response from - ${Date.now() - now}ms`,
          );
        }
      }),
    );
  }
}
