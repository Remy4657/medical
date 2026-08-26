import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { auth } from '../../auth/auth';
import { fromNodeHeaders } from 'better-auth/node';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Extend Express Request with a user property for TypeScript
    // type RequestWithUser = Request & { user?: any };
    // const request = context.switchToHttp().getRequest<RequestWithUser>();

    // const headers = new Headers();

    // const cookie = request.headers.cookie;
    // if (cookie) {
    //   headers.set('cookie', cookie);
    // }
    // console.log('headers: ', headers);
    // const session = await auth.api.getSession({
    //   headers,
    // });

    const request = context.switchToHttp().getRequest();
    console.log('request.headers: ', request.headers);
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(request.headers),
    });

    // if (!session) {
    //   throw new UnauthorizedException('Unauthorized');
    // }
    // Gắn user vào request
    request.user = session?.user ?? null;

    return true;
  }
}
