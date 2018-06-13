import { Controller, Get, Query } from '@nestjs/common';

import { WatinoService } from './watino.service';
import { Watino } from './watino.entity';

@Controller('watino')
export class WatinoController {
  constructor(
    private readonly watinoService: WatinoService,
  ) {}

  /**
   * Get all data from a specific date.
   * @param {number|string} from - Date timestamp.
   * @returns {Promise<Watino[]>}
   */
  @Get()
  async findAll(@Query('from') from): Promise<Watino[]> {
    return await this.watinoService.findAll({from});
  }
}
