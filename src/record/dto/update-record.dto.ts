/* eslint-disable prettier/prettier */
import { PartialType } from "@nestjs/swagger";
import { RecordDto } from "./record.dto";

export class UpdateRecordDto extends PartialType(RecordDto){
   
}