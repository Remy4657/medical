import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}

  async getAllNames() {
    return this.brandRepository.find({
      select: {
        id: true,
        name: true,
        slug: true,
      },
      order: {
        name: 'ASC',
      },
    });
  }
}
