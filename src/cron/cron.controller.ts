import { Controller } from '@nestjs/common';

import { CronService } from './cron.service';
import { WekaService } from '../weka/weka.service';
import { WatinoService } from '../watino/watino.service';
import { EmailService } from '../services/email.service';
import * as moment from 'moment';
import { ChartService } from '../services/chart.service';

const {ENABLE_ALERT_CRON_JOB} = process.env;
const CRON_EVERY_MIDNIGHT = '0 0 0 */1 * *';
const CRON_EVERY_HOUR = '0 0 */1 * * *';

@Controller('cron')
export class CronController {
  constructor(
    private readonly cronService: CronService,
    private readonly watinoService: WatinoService,
    private readonly wekaService: WekaService,
  ) {
    this.initTasks();
  }

  /**
   * Initialize cron tasks.
   */
  initTasks(): void {
    this.initDailyReportsTask();
    this.initAlertOnEmptyDataTask();
  }

  /**
   * Creates daily report cron job.
   */
  initDailyReportsTask(): void {
    const {cronService} = this;
    cronService.schedule(CRON_EVERY_MIDNIGHT, async () => {
      const metrics = await this.getDailyMetrics();
      await Promise.all([
        ChartService.create({name: 'watino', data: metrics.watino}),
        ChartService.create({name: 'weka', data: metrics.weka}),
      ]);
      EmailService.sendImages({
        subject: 'Daily report',
        images: Object.keys(metrics).map(image => `${image}.png`),
      });
    });
  }

  /**
   * Creates cron job that check metrics values every hour
   * and sends alert on email if data contains 4 consecutive 0.
   */
  initAlertOnEmptyDataTask(): void {
    if (!ENABLE_ALERT_CRON_JOB) {
      return;
    }
    const {cronService} = this;
    const hasEmptyConsecutiveValues = (data) => {
      return !!(data.map(item => item.value).join(' ').indexOf(' 0 0 0 0 ') + 1);
    };

    cronService.schedule(CRON_EVERY_HOUR, async () => {
      const metrics = await this.getDailyMetrics();
      if (hasEmptyConsecutiveValues(metrics.weka) || hasEmptyConsecutiveValues(metrics.watino)) {
        EmailService.send({subject: 'Alert', text: 'Alert'});
      }
    });
  }

  /**
   * Receive daily stats from all metrics.
   * @returns {Promise<any>}
   */
  async getDailyMetrics(): Promise<any> {
    const {watinoService, wekaService} = this;
    const dayAgo = moment().subtract(1, 'days').unix();
    const watinoMetrics = await watinoService.findAll({from: dayAgo});
    const wekaMetrics = await wekaService.findAll({from: dayAgo});
    return {
      watino: watinoMetrics,
      weka: wekaMetrics,
    };
  }
}
