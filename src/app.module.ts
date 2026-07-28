import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { RoleModule } from './role/role.module';
import { Role } from './role/entities/role.entity';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entities/category.entity';
import { Product } from './product/entities/product.entity';

@Module({
  imports: [
    // cấu hình đọc biến môi trường
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // cấu hình typeorm
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Role, Product, Category],
      synchronize: false,
      logging: true,
    }),
    UserModule,
    RoleModule,
    CategoryModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
  ],
})
export class AppModule {}
