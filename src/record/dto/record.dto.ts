/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-wrapper-object-types */

import { IsDateString } from "class-validator";
import { Period } from "generated/client";
export class RecordDto{
    readonly id?: number;
    readonly user_id: string;
    readonly menu_id: string;

    @IsDateString()
    readonly timestamp: string;
    readonly period: Period;
}