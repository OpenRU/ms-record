/* eslint-disable prettier/prettier */
import { PartialType } from "@nestjs/mapped-types";
import { RecordDto } from "./record.dto";

export class UpdateRecordDto extends PartialType(RecordDto){
   
}