import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { User } from '@nx-monorepo/backend/core';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req: { user: User }): Promise<string> {
        const currentUser = req.user;
        return this.authService.createAccessToken(currentUser);
    }

    @UseGuards(JwtAuthGuard)
    @Get('verify')
    async verify(@Request() req: { user: JwtPayload['data'] }): Promise<JwtPayload['data']> {
        return req.user;
    }
}
