/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RecordController } from './record.controller';
import { AuthModule } from 'src/auth/auth.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports:[PrismaModule, HttpModule,AuthModule],
  providers: [RecordService],
  controllers:[RecordController]
})
export class RecordModule {}
