import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { TSuccessResponse } from '@nx-monorepo/nest';
import { User, UserRoles } from '@nx-monorepo/backend/core';
import { Request } from 'express';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(RoleGuard(UserRoles.ADMIN))
    @UseGuards(JwtAuthGuard)
    @Get()
    getAllUsers(): Promise<User[]> {
        return this.userService.getAll();
    }

    @Post('create')
    createUser(@Body() createUserDto: CreateUserDto): Promise<TSuccessResponse> {
        return this.userService.create(createUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Req() req: Request) {
        return req.user;
    }
}
