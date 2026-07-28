import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [],
  providers: [],
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule, // bật passport
    JwtModule.register({
      // cung cap JwtService để tạo token
      global: true,
      secret: process.env.JWT_SECRET || 'your-secret-key', // key để tạo token
      signOptions: { expiresIn: '15m' },
    }),
  ],
})
export class UserModule {}
