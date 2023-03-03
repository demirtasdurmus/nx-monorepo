import { IUser, UpdateUserAttrs } from '../entities/user.entity';
import { IUserRepository } from '../user.repository.interface';

export abstract class IUpdateUserByIdUsecase {
    abstract execute(id: string, updateUserAttrs: UpdateUserAttrs): Promise<IUser>;
}

export class UpdateUserByIdUsecase implements IUpdateUserByIdUsecase {
    constructor(private readonly repository: IUserRepository) {}

    async execute(id: string, updateUserAttrs: UpdateUserAttrs): Promise<IUser> {
        return this.repository.updateById(id, updateUserAttrs);
    }
}
