/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordDto } from './dto/record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';

@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post()
  async createRecord(@Body() recordDto: RecordDto) {
    return this.recordService.create(recordDto);
  }
  @Get()
  async showAllRecords(){
    return this.recordService.showAllRecords()
  }

   @Get('history')
  async history(@Query('user_id') userId: string) {
    return this.recordService.getHistory(userId);
  }

  @Get('total')
  async totalByDate(@Query('data') data: string) {
    return this.recordService.getTotalMeals(data);
  }

  @Get(':id')
  async getRecord(@Param('id', ParseIntPipe) id: number){
    return this.recordService.getRecord(id);
  }


  @Put(':id')
  async updateMeal(@Param('id', ParseIntPipe) id: number, @Body()updateRecordDto: UpdateRecordDto){
    return this.recordService.updateRecord(id, updateRecordDto);
  }

 @Delete(':id')
  async deleteRecord(@Param('id', ParseIntPipe) id: number){
    return this.recordService.deleteRecord(id);
  } 

}