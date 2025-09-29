/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Http2ServerRequest } from 'http2';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private readonly httpService: HttpService){}

    async canActivate(context: ExecutionContext): Promise<boolean>{
        const request = context.switchToHttp().getRequest<Http2ServerRequest>()
        const token = request.headers.authorization;

        if(!token){
            throw new UnauthorizedException('Token de autorização não fornecido');
        }

        try{
            const response = await firstValueFrom(
                this.httpService.post(
                    `${process.env.MS_AUTH_PREFIX}/validate-token}`,
                    {token},
                ),
            )

            return response.status === 200;
        } catch(error){
            throw new Error(`Token invalido ou expirado: ${error}`);
        }
    }
}