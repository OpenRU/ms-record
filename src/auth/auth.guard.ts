/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Http2ServerRequest } from 'http2';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ){}

    async canActivate(context: ExecutionContext): Promise<boolean>{
        const request = context.switchToHttp().getRequest<Http2ServerRequest>()
        const token = request.headers.authorization;

        if(!token){
            throw new UnauthorizedException('Token de autorização não fornecido');
        }

        try{
            const msAuthUrl = this.configService.get<string>('MS_AUTH_URL')
            const response = await firstValueFrom(
                this.httpService.post(
                    `http://${msAuthUrl}/auth/validate-token/`,
                    {token},
                ),
            )

            return response.status === 200;
        } catch(error){
            throw new Error(`Token invalido ou expirado: ${error}`);
        }
    }
}