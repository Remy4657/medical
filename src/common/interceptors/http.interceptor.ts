import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';

@Injectable()
export class HttpInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const startTime = Date.now();

    return next.handle().pipe(
      tap(() => {
        // tap để xem dữ liệu, nếu muốn biến đổi dữ liệu thì dùng map
        const duration = Date.now() - startTime;
        console.log(`Thời gian xử lý: ${duration}ms`);
      }),
      map((data) => ({
        statusCode: response.statusCode,
        data: data,
      })),
    );
  }
}
