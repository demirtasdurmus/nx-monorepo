import { User } from '../entities/user.entity';
import { IUserRepository } from '../user.repository.interface';

export abstract class IGetUserByEmailUsecase {
    abstract execute(email: string): Promise<User>;
}

export class GetUserByEmailUsecase implements IGetUserByEmailUsecase {
    constructor(private readonly repository: IUserRepository) {}

    async execute(email: string): Promise<User | null> {
        return this.repository.getByEmail(email);
    }
}
