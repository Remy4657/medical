import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      const errorBody =
        typeof exceptionResponse === 'string'
          ? {
              message: exceptionResponse,
            }
          : (exceptionResponse as { message?: string });

      res.status(status).json({
        statusCode: status,
        ...errorBody,
        message: errorBody.message || 'Đã có lỗi xảy ra!',
      });

      return;
    }

    console.log('Unexpected error:', exception);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Đã có lỗi xảy ra, vui lòng thử lại sau',
      errorCode: 'INTERNAL_SERVER_ERROR',
    });
  }
}
