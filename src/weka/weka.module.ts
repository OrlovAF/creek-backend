import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WekaController } from './weka.controller';
import { WekaService } from './weka.service';
import { Weka } from './weka.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Weka])],
  providers: [WekaService],
  controllers: [WekaController],
  exports: [WekaService],
})
export class WekaModule {}
