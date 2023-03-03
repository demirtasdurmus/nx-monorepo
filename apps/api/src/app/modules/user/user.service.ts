import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import {
    IUser,
    IGetAllUsersUsecase,
    IGetUserByIdUsecase,
    ICreateUserUsecase,
    IGetUserByEmailUsecase,
    CreateUserAttrs,
} from '@nx-monorepo/backend/core';
import { BcryptService, TSuccessResponse, SuccessResponse } from '@nx-monorepo/nest';

@Injectable()
export class UserService {
    private logger = new Logger(UserService.name);
    constructor(
        private readonly getAllUsersUsecase: IGetAllUsersUsecase,
        private readonly getUserByIdUsecase: IGetUserByIdUsecase,
        private readonly getUserByEmailUsecase: IGetUserByEmailUsecase,
        private readonly createUserUsecase: ICreateUserUsecase,
        private readonly bcryptService: BcryptService,
    ) {}

    async getAll(): Promise<IUser[]> {
        return this.getAllUsersUsecase.execute();
    }

    async getById(id: string): Promise<IUser> {
        return this.getUserByIdUsecase.execute(id);
    }

    async getByEmail(email: string): Promise<IUser> {
        return this.getUserByEmailUsecase.execute(email);
    }

    async create(createUserDto: CreateUserDto): Promise<TSuccessResponse> {
        const user = await this.getUserByEmailUsecase.execute(createUserDto.email);
        if (user) {
            this.logger.warn(`User couldn't be created with email:${createUserDto.email} already exists.`);
            throw new ConflictException('This user has already been registered');
        }
        const hashedPassword = await this.bcryptService.hash(createUserDto.password);

        const createUserAttrs: CreateUserAttrs = {
            firstName: createUserDto.firstName,
            lastName: createUserDto.lastName,
            email: createUserDto.email,
            password: hashedPassword,
        };

        await this.createUserUsecase.execute(createUserAttrs);
        return SuccessResponse;
    }
}
