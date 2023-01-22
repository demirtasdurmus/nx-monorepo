import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import {
    User,
    IGetAllUsersUsecase,
    IGetUserByIdUsecase,
    ICreateUserUsecase,
    IGetUserByEmailUsecase,
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

    async getAll(): Promise<User[]> {
        return this.getAllUsersUsecase.execute();
    }

    async getById(id: string): Promise<User> {
        return this.getUserByIdUsecase.execute(id);
    }

    async getByEmail(email: string): Promise<User> {
        return this.getUserByEmailUsecase.execute(email);
    }

    async create(createUserDto: CreateUserDto): Promise<TSuccessResponse> {
        const { email, password } = createUserDto;
        const user = await this.getUserByEmailUsecase.execute(email);
        if (user) {
            this.logger.warn(`User couldn't be created with email:${email} already exists.`);
            throw new ConflictException('This user has already been registered');
        }
        const hashedPassword = await this.bcryptService.hash(password);

        await this.createUserUsecase.execute({ email, password: hashedPassword });
        return SuccessResponse;
    }
}
