import { Controller, Get, Query } from '@nestjs/common';
import { SearchProductsDto, SuggestSearchDto } from './dto/search.dto';
import { SearchService } from './search.service';

@Controller('api/v1/search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  /**
   * Search suggestion cho dropdown
   *
   * GET /search/suggest?q=thuốc%20đau%20bụng
   *
   */
  @Get('suggest')
  async suggest(@Query() query: SuggestSearchDto) {
    return this.searchService.suggest(query.q);
  }

  /**
   * Search full page
   *
   * GET /search?q=thuốc đau bụng&page=1&limit=20
   */
  @Get()
  async search(@Query() query: SearchProductsDto) {
    return this.searchService.search(
      query.q,
      query.page ?? 1,
      query.limit ?? 20,
    );
  }
}
