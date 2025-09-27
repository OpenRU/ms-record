/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RecordController } from './record.controller';

@Module({
  imports:[PrismaModule],
  providers: [RecordService],
  controllers:[RecordController]
})
export class RecordModule {}
