import { Injectable } from '@nestjs/common';
import * as cron from 'node-cron';

@Injectable()
export class CronService {
  /**
   * Creates new cron job.
   * @param {string} expression - Cron expression in format '* * * * * *'.
   * @param {any} task - Task to do.
   */
  schedule(expression: string, task): void {
    cron.schedule(expression, task, true);
  }
}