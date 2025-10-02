/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus } from "@nestjs/common";

export class DateEmptyException extends HttpException{
    constructor(){
        super('A data não pode ser nula', HttpStatus.BAD_REQUEST);
    }
}