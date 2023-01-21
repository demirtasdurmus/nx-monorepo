import { User } from '../entities/user.entity';
import { IUserRepository } from '../user.repository.interface';

export abstract class IUpdateUserByIdUsecase {
    abstract execute(id: string, UserToUpdate: User): Promise<User>;
}

export class UpdateUserByIdUsecase implements IUpdateUserByIdUsecase {
    constructor(private readonly repository: IUserRepository) {}

    execute(id: string, UserToUpdate: User): Promise<User> {
        return this.repository.updateById(id, UserToUpdate);
    }
}
