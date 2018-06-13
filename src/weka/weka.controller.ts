import { Controller, Get, Query } from '@nestjs/common';

import { WekaService } from './weka.service';
import { Weka } from './weka.entity';

@Controller('weka')
export class WekaController {
  constructor(
    private readonly wekaService: WekaService,
  ) {}

  /**
   * Get all data from a specific date.
   * @param {number|string} from - Date timestamp.
   * @returns {Promise<Weka[]>}
   */
  @Get()
  async findAll(@Query('from') from): Promise<Weka[]> {
    return await this.wekaService.findAll({from});
  }
}
