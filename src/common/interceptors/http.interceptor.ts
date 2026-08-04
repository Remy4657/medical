import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';
import { RESPONSE_MESSAGE_KEY } from '../decorators/response-message.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class HttpInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const message =
      this.reflector.get<string>(RESPONSE_MESSAGE_KEY, context.getHandler()) ??
      'Success';
    const startTime = Date.now();

    return next.handle().pipe(
      tap(() => {
        // tap để xem dữ liệu, nếu muốn biến đổi dữ liệu thì dùng map
        const duration = Date.now() - startTime;
        console.log(`Thời gian xử lý: ${duration}ms`);
      }),
      map((data) => ({
        success: true,
        statusCode: response.statusCode,
        message,
        data: data,
      })),
    );
  }
}
