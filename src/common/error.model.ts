/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class SwaggerErrorModule {
  @ApiProperty({
    example: 'Ocorreu um erro',
    description: 'Mensagem detalhada do erro',
  })
  mensage: string;

  @ApiProperty({
    example: 'HttpException',
    description: 'Tipo do erro',
  })
  errorType: string;

  @ApiProperty({
    example: 400,
    description: 'Codigo de status HTTP',
  })
  statusCode: number;
}
