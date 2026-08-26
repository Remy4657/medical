import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PayOS } from '@payos/node';

import { PayOSService } from './payos.service';
import { PayOSController } from './payos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../order/entities/order.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Order])],
  controllers: [PayOSController],
  providers: [
    {
      provide: PayOS,
      inject: [ConfigService],
      useFactory: () => {
        return new PayOS({
          clientId: process.env.PAYOS_CLIENT_ID,
          apiKey: process.env.PAYOS_API_KEY,
          checksumKey: process.env.PAYOS_CHECKSUM_KEY,
        });
      },
    },
    PayOSService,
  ],
  exports: [PayOSService],
})
export class PayOSModule {}
