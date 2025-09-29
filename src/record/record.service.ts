/* eslint-disable prettier/prettier */
import { RecordDto } from './dto/record.dto';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { RecordAlreadyExistsException } from 'src/exceptions/record-already-exists.exception';
import { IdEmptyException } from 'src/exceptions/id-empty.exception';
import { RecordNotFoundException } from 'src/exceptions/record-not-found.exception';
import { DateEmptyException } from 'src/exceptions/date-empty.exception';
import { UpdateRecordDto } from './dto/update-record.dto';

@Injectable()
export class RecordService {
    constructor(private readonly PrismaService: PrismaService){}

    async create(recordDto: RecordDto){
        const { user_id, period, menu_id,} = recordDto;
        const dateOnly = new Date(recordDto.timestamp,);
        const recordAlreadyExists = await this.PrismaService.record.findFirst({
            where: {
                user_id,
                period,
                timestamp: dateOnly.toISOString(),
            },
        });

        if(recordAlreadyExists){
            throw new RecordAlreadyExistsException();
        }

        const createRecord = await this.PrismaService.record.create({
            data: {
                user_id, menu_id, timestamp: dateOnly, period
            },
        });

        return createRecord;
    }

    async showAllRecords(){
        const allRecords = await this.PrismaService.record.findMany();
        return allRecords;
    }

    async getRecord(id: number){
        if(!id){
            throw new IdEmptyException();
        }
        const oneRecord = await this.PrismaService.record.findFirst({
            where: {
                id
            },
        });
        if(!oneRecord){
            throw new RecordNotFoundException();
        }

        return oneRecord;
    }

    async getHistory(user_id: string){
        const userHistory = await this.PrismaService.record.findMany({
            where:{
                user_id
            },
            orderBy:{
                timestamp: 'desc'
            },
        });
        return userHistory;
    }

    async getTotalMeals(data: string){
        if(!data){
            throw new DateEmptyException();
        }

    const day = new Date(data);
    const start = new Date(day.setHours(0, 0, 0, 0));
    const end = new Date(day.setHours(23, 59, 59, 999));

    const totalMealsByUser = await this.PrismaService.record.count({
      where: {
        timestamp: {
          gte: start,
          lte: end,
        },
      },
    });
    return totalMealsByUser;
    }

    async updateRecord(id: number, updateRecordDto: UpdateRecordDto ){
        const {user_id, menu_id, timestamp, period} = updateRecordDto;
        const record = await this.PrismaService.record.findUnique({
                where: {
                    id
                },
            });

        if(!record){
            throw new RecordNotFoundException();
        }
        const dateOnly = new Date(timestamp as string);
        const recordUpdate = await this.PrismaService.record.update({
            where: {
                id: record.id,
            },
            data:{
                user_id: user_id ?? record.user_id,
                menu_id: menu_id ?? record.menu_id,
                timestamp: dateOnly.toISOString() ?? record.timestamp,
                period: period ?? record.period
            },   
        });
        return recordUpdate;
    }

    async deleteRecord(id: number){
        const found = await this.PrismaService.record.findUnique({
            where: {
                id
            }
        });
        if(!found){
            throw new RecordNotFoundException();
        }
        await this.PrismaService.record.delete({
            where: {
                id
            }
        });
        return{
            message: 'Deletado com sucesso!'
        }
    }
}
