import { CreateUserAttrs, IUser } from '../entities/user.entity';
import { IUserRepository } from '../user.repository.interface';

export abstract class ICreateUserUsecase {
    abstract execute(createUserAttrs: CreateUserAttrs): Promise<IUser>;
}

export class CreateUserUsecase implements ICreateUserUsecase {
    constructor(private readonly repository: IUserRepository) {}

    async execute(createUserAttrs: CreateUserAttrs): Promise<IUser> {
        return this.repository.create(createUserAttrs);
    }
}
