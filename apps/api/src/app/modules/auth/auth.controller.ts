import { Controller, Get, Post, Req, UseGuards, Res, HttpCode } from '@nestjs/common';
import { IUser } from '@nx-monorepo/backend/core';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @HttpCode(200)
    async login(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<void> {
        const jwt = await this.authService.createAccessToken(req.user as IUser);
        res.cookie('jwt', jwt, {
            httpOnly: true,
            secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
            sameSite: process.env.NODE_ENV === 'development' ? 'lax' : 'strict',
            expires: new Date(Date.now() + 10 * 60 * 1000),
        }).send({ status: 'ok' });
    }

    @UseGuards(JwtAuthGuard)
    @Get('verify')
    async verify(@Req() req: { user: JwtPayload['data'] }): Promise<JwtPayload['data']> {
        return req.user;
    }

    @Get('logout')
    async logout(@Res({ passthrough: true }) res: Response) {
        res.cookie('jwt', '', { expires: new Date() });
    }
}
