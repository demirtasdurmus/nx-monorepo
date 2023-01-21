import { User } from '../entities/user.entity';
import { IUserRepository } from '../user.repository.interface';

export abstract class IGetUserByIdUsecase {
    abstract execute(id: string): Promise<User>;
}

export class GetUserByIdUsecase implements IGetUserByIdUsecase {
    constructor(private readonly repository: IUserRepository) {}

    async execute(id: string): Promise<User> {
        const User = await this.repository.getById(id);
        // TODO: create a dedicated exeption lib to handle these cases
        if (User === undefined) throw new Error('User not found.');
        return User;
    }
}
