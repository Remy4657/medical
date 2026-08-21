import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.access_token; // config lấy access_token từ cookie
        },
      ]),
      ignoreExpiration: false, // nếu token hết hạn thì throw lỗi 401
      secretOrKey: process.env.JWT_SECRET || 'your-secret-key', // secret giải mã
    });
  }
  // hàm validate sau khi token được giải mã thành công, nếu không giải mã được thì Passport sẽ throw lỗi 401
  async validate(payload: any) {
    return payload; // obj trả về được gán ở req.user, trả về thông tin được giải mã từ token
  }
}
