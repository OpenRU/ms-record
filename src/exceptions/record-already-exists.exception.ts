/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus } from "@nestjs/common";

export class RecordAlreadyExistsException extends HttpException{
    constructor(){
        super('Refeição já registrada nesse horário hoje', HttpStatus.CONFLICT);
    }
}