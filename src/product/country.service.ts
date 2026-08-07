import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from './entities/country.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  async getAllNames() {
    return this.countryRepository.find({
      select: {
        id: true,
        name: true,
        code: true,
      },
      order: {
        name: 'ASC',
      },
    });
  }
}
