import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { Weka } from './weka.entity';
import * as moment from 'moment';

@Injectable()
export class WekaService {
  constructor(
    @InjectRepository(Weka)
    private readonly wekaRepository: Repository<Weka>,
  ) {}

  /**
   * Receive all Weka data from a specific date.
   * @param {string|number} from - Date timestamp.
   * @returns {Promise<Weka[]>}
   */
  async findAll({from}): Promise<Weka[]> {
    const date = moment(parseInt(from, 10)).format('YYYY-MM-DD HH:mm:ss');
    return await this.wekaRepository.find({
      select: ['date', 'value'],
      where: {
        date: MoreThan(date),
      },
    });
  }
}