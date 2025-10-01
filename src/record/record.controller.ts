/* eslint-disable prettier/prettier */
import { ResponseRecordDto } from './dto/response-record.dto';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordDto } from './dto/record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { SwaggerErrorModule } from '../common/error.model';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post()
  @ApiOperation({summary: 'Criar um novo registro.'})
  @ApiResponse({
    status: 201,
    description: 'Registro da refeição feito com sucesso',
    type: ResponseRecordDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Refeição já registrada nesse horário hoje',
    type: SwaggerErrorModule,
  })
  @ApiResponse({
    status: 401,
    description: 'Token não autorizado ou invalido',
    type: SwaggerErrorModule,
  })
  async createRecord(@Body() recordDto: RecordDto) {
    return this.recordService.create(recordDto);
  }

  @Get()
  @ApiOperation({summary: 'Mostrar todos os registros feitos.'})
  @ApiResponse({
    status: 200,
    description: 'Refeições encontradas com sucesso.',
    type: ResponseRecordDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Token não autorizado ou invalido',
    type: SwaggerErrorModule,
  })
  async showAllRecords(){
    return this.recordService.showAllRecords()
  }

   @Get('history')
   @ApiOperation({summary: 'Mostra o histórico de registros de um usuário.'})
   @ApiResponse({
    status: 200,
    description: 'Histórico encontrado com sucesso',
    type: ResponseRecordDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Token não autorizado ou invalido',
    type: SwaggerErrorModule,
  })
  @ApiQuery({
    name: 'user_id',
    required: true,
    example: '123',
    description: 'Id do usuário específico.'
   })
  async history(@Query('user_id') userId: string) {
    return this.recordService.getHistory(userId);
  }

  @Get('total')
  @ApiOperation({summary: 'Conta quantos registros foram feitos em uma data.'})

  @ApiResponse({
    status: 200,
    description: 'Número de registros feitos hoje encotrados com sucesso.',
    type: ResponseRecordDto,
  })
  @ApiResponse({
    status: 400,
    description: 'A data não pode ser nula.',
    type: SwaggerErrorModule,
  })
  @ApiResponse({
    status: 401,
    description: 'Token não autorizado ou invalido',
    type: SwaggerErrorModule,
  })
  @ApiQuery({
    name: 'data',
    required: true,
    example: '2025-12-11',
    description: 'Data específica.'
   })
  async totalByDate(@Query('data') data: string) {
    return this.recordService.getTotalMeals(data);
  }

  @Get(':id')
  @ApiOperation({summary: 'Mostra um registro específico.'})
  @ApiResponse({
    status: 200,
    description: 'Refeição encontrada',
    type: ResponseRecordDto,
  })
  @ApiResponse({
    status: 400,
    description: 'O ID não pode ser nulo.',
    type: SwaggerErrorModule,
  })
  @ApiResponse({
    status: 404,
    description: 'Registro não encontrado.',
    type: SwaggerErrorModule,
  })
  @ApiResponse({
    status: 401,
    description: 'Token não autorizado ou invalido',
    type: SwaggerErrorModule,
  })
  @ApiParam({
    name: 'id',
    example: '1',
    description: 'Id do registro específico'
   })
  async getRecord(@Param('id', ParseIntPipe) id: number){
    return this.recordService.getRecord(id);
  }


  @Put(':id')
  @ApiOperation({summary: 'Atualiza um registro específico.'})
  @ApiResponse({
    status: 200,
    description: 'Registro atualizado com sucesso.',
    type: ResponseRecordDto,
  })
  @ApiResponse({
    status: 400,
    description: 'O ID não pode ser nulo.',
    type: SwaggerErrorModule,
  })
  @ApiResponse({
    status: 404,
    description: 'Registro não encontrado.',
    type: SwaggerErrorModule,
  })
  @ApiResponse({
    status: 401,
    description: 'Token não autorizado ou invalido',
    type: SwaggerErrorModule,
  })
  @ApiParam({
    name: 'id',
    example: '1',
    description: 'Id do registro específico'
   })
  async updateMeal(@Param('id', ParseIntPipe) id: number, @Body()updateRecordDto: UpdateRecordDto){
    return this.recordService.updateRecord(id, updateRecordDto);
  }

 @Delete(':id')
 @ApiOperation({summary: 'Deleta um registro específico.'})
 @ApiResponse({
    status: 200,
    description: 'Registro deletado com sucesso.',
    schema: {
            example: { message: 'Deletado com sucesso!' }
        },
    })
 @ApiResponse({
  status: 404,
  description: 'Registro não encontrado.',
  type: SwaggerErrorModule,
 })
 @ApiResponse({
  status: 401,
  description: 'Token não autorizado ou invalido',
  type: SwaggerErrorModule,
 })   
 @ApiParam({
    name: 'id',
    example: '1',
    description: 'Id do registro específico'
   })
  async deleteRecord(@Param('id', ParseIntPipe) id: number){
    return this.recordService.deleteRecord(id);
  } 

}