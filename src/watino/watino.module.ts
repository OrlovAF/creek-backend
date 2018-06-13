import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WatinoController } from './watino.controller';
import { WatinoService } from './watino.service';
import { Watino } from './watino.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Watino])],
  providers: [WatinoService],
  controllers: [WatinoController],
  exports: [WatinoService],
})
export class WatinoModule {}
