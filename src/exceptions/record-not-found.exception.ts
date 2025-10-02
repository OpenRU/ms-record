/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus } from "@nestjs/common";

export class RecordNotFoundException extends HttpException{
    constructor(){
        super('Esse registro não existe', HttpStatus.NOT_FOUND)
    }
}