import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Watino } from './watino.entity';
import * as moment from 'moment';

@Injectable()
export class WatinoService {
  constructor(
    @InjectRepository(Watino)
    private readonly watinoRepository: Repository<Watino>,
  ) {}

  /**
   * Receive all Watino data from a specific date.
   * @param {string|number} from - Date timestamp.
   * @returns {Promise<Watino[]>}
   */
  async findAll({from}): Promise<Watino[]> {
    const date = moment(parseInt(from, 10)).format('YYYY-MM-DD HH:mm:ss');
    return await this.watinoRepository.find({
      select: ['date', 'value'],
      where: {
        date: MoreThan(date),
      },
    });
  }
}