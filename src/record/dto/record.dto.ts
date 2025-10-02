/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-wrapper-object-types */
import { Period } from "@prisma/client";
import { IsDateString } from "class-validator";

export class RecordDto{
    readonly user_id: string;
    readonly menu_id: string;

    @IsDateString()
    readonly timestamp: string;
    readonly period: Period;
}