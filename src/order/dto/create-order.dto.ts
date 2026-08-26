import {
  IsInt,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Min,
  ValidateNested,
  IsOptional,
  IsNumberString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderItemDto {
  @IsInt()
  @Min(1)
  variantId: number;

  @IsInt()
  @Min(1)
  quantity: number;

  // Giá client đang hiển thị
  @IsNumberString()
  clientSalePrice: string;
}

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  receiverName: string;

  @IsString()
  @IsNotEmpty()
  receiverPhone: string;

  @IsString()
  @IsNotEmpty()
  shippingAddress: string;

  @IsString()
  @IsNotEmpty()
  paymentMethod: string;

  @IsOptional()
  @IsString()
  note?: string;

  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];
}
