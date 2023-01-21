import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import {
    User,
    IGetAllUsersUsecase,
    IGetUserByIdUsecase,
    ICreateUserUsecase,
    IGetUserByEmailUsecase,
} from '@nx-monorepo/backend/core';

@Injectable()
export class UserService {
    constructor(
        private readonly getAllUsersUsecase: IGetAllUsersUsecase,
        private readonly getUserByIdUsecase: IGetUserByIdUsecase,
        private readonly getUserByEmailUsecase: IGetUserByEmailUsecase,
        private readonly createUserUsecase: ICreateUserUsecase,
    ) {}

    async getAll(): Promise<User[]> {
        return this.getAllUsersUsecase.execute();
    }

    async getById(id: string): Promise<User> {
        return this.getUserByIdUsecase.execute(id);
    }

    async getByEmail(email: string): Promise<User> {
        return this.getUserByEmailUsecase.execute(email);
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        return this.createUserUsecase.execute(createUserDto);
    }
}
