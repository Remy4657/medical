import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // Kiểm tra metadata `isPublic`
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    // Nếu không public, chạy Passport
    return super.canActivate(context);
  }

  // Tùy chỉnh lỗi trả về khi token không hợp lệ
  handleRequest(err: any, user: any, info: any) {
    // Nếu có lỗi từ Passport hoặc user null

    if (err || !user) {
      let message = 'Unauthorized';
      if (info && info.name === 'TokenExpiredError') {
        message = 'Access token has expired';
      } else if (info && info.name === 'JsonWebTokenError') {
        message = 'Invalid access token signature';
      } else if (err) {
        console.log('err message: ', err.message);
        message = err.message || 'Authentication failed';
      }
      throw new UnauthorizedException(message);
    }
    return user; // user chính là payload đã decode (hoặc kết quả từ validate)
  }
}
