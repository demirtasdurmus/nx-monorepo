import { User } from '../entities/user.entity';
import { IUserRepository } from '../user.repository.interface';

export abstract class ICreateUserUsecase {
    abstract execute(User: User): Promise<User>;
}

export class CreateUserUsecase implements ICreateUserUsecase {
    constructor(private readonly repository: IUserRepository) {}

    execute(User: User): Promise<User> {
        return this.repository.create(User);
    }
}
