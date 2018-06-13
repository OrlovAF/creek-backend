import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { CronController } from './cron.controller';
import { WekaService } from '../weka/weka.service';
import { WatinoService } from '../watino/watino.service';
import { WatinoModule } from '../watino/watino.module';
import { WekaModule } from '../weka/weka.module';

@Module({
  imports: [WatinoModule, WekaModule],
  providers: [CronService],
  controllers: [CronController],
})
export class CronModule {
  constructor(
    private readonly watinoService: WatinoService,
    private readonly wekaService: WekaService,
  ) {}
}
