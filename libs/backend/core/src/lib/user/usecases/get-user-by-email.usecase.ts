import { IUser } from '../entities/user.entity';
import { IUserRepository } from '../user.repository.interface';

export abstract class IGetUserByEmailUsecase {
    abstract execute(email: string): Promise<IUser>;
}

export class GetUserByEmailUsecase implements IGetUserByEmailUsecase {
    constructor(private readonly repository: IUserRepository) {}

    async execute(email: string): Promise<IUser | null> {
        return this.repository.getByEmail(email);
    }
}
