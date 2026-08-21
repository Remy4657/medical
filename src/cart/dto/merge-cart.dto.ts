// src/cart/dto/merge-cart.dto.ts

import { IsArray, IsInt, Min, ValidateNested } from 'class-validator';

import { Type } from 'class-transformer';

export class MergeCartItemDto {
  @IsInt()
  variantId: number;

  @IsInt()
  @Min(1)
  quantity: number;
}

export class MergeCartDto {
  @IsArray()
  @ValidateNested({
    each: true,
  })
  @Type(() => MergeCartItemDto)
  items: MergeCartItemDto[];
}
