import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { TSuccessResponse } from '@nx-monorepo/nest';
import { UserRoles } from '@nx-monorepo/backend/core';
import { Request } from 'express';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('create')
    createUser(@Body() createUserDto: CreateUserDto): Promise<TSuccessResponse> {
        return this.userService.create(createUserDto);
    }

    @UseGuards(RoleGuard(UserRoles.ADMIN))
    @UseGuards(RoleGuard(UserRoles.USER))
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Req() req: Request) {
        return req.user;
    }
}
