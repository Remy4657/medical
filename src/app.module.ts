import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoleModule } from './role/role.module';
import { Role } from './role/entities/role.entity';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entities/category.entity';
import { Product } from './product/entities/product.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/user.entity';
import { Account } from './auth/entities/account.entity';
import { Session } from './auth/entities/session.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Brand } from './product/entities/brand.entity';
import { Country } from './product/entities/country.entity';
import { Inventory } from './product/entities/inventory.entity';
import { ProductImage } from './product/entities/product-image.entity';
import { ProductPrice } from './product/entities/product-price.entity';
import { ProductUnit } from './product/entities/product-unit.entity';
import { ProductVariant } from './product/entities/product-variant.entity';
import { Attribute } from './product/entities/attribute.entity';
import { ProductAttribute } from './product/entities/product-attribute.entity';

@Module({
  imports: [
    // cấu hình đọc biến môi trườngg
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
      entities: [
        User,
        Account,
        Session,
        Role,
        Product,
        Category,
        Brand,
        Country,
        Inventory,
        ProductImage,
        ProductPrice,
        ProductUnit,
        ProductVariant,
        Attribute,
        ProductAttribute,
      ],
      synchronize: process.env.NODE_ENV !== 'production',
      logging: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    RoleModule,
    CategoryModule,
    ProductModule,
    AuthModule,
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
