import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { TSuccessResponse } from '@nx-monorepo/nest';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('create')
    createUser(@Body() createUserDto: CreateUserDto): Promise<TSuccessResponse> {
        return this.userService.create(createUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
