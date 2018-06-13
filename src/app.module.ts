import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { WatinoModule } from './watino/watino.module';
import { WekaModule } from './weka/weka.module';
import { CronModule } from './cron/cron.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    WatinoModule,
    WekaModule,
    CronModule,
  ],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
