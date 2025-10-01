/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { $Enums, Period } from "@prisma/client";

export class ResponseRecordDto{
    @ApiProperty({
        example: '123',
        description: 'O id do usuário',
    })
    user_id: string;

    @ApiProperty({
        example: '123',
        description: 'O id do menu.',
    })
    menu_id: string;

    @ApiProperty({
        example: '2025-09-29',
        description: 'A data do registro, sem a hora.',
        type: 'string', 
        format: 'date',
    })
    timestamp: Date;
    
    @ApiProperty({
        enum: Period,
        enumName: 'Period',
        description: 'Período da refeição',
        example: Period.Morning,
    })
    period: $Enums.Period;
}