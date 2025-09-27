/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus } from "@nestjs/common";

export class IdEmptyException extends HttpException{
    constructor(){
        super('O ID não pode ser nulo', HttpStatus.BAD_REQUEST);
    }
}