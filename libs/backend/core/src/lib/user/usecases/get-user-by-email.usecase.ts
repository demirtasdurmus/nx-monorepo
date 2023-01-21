import { User } from '../entities/user.entity';
import { IUserRepository } from '../user.repository.interface';

export abstract class IGetUserByEmailUsecase {
    abstract execute(email: string): Promise<User>;
}

export class GetUserByEmailUsecase implements IGetUserByEmailUsecase {
    constructor(private readonly repository: IUserRepository) {}

    async execute(email: string): Promise<User> {
        const user = await this.repository.getByEmail(email);
        // TODO: create a dedicated exeption lib to handle these cases
        if (!user) throw new Error('User not found.');
        return user;
    }
}
