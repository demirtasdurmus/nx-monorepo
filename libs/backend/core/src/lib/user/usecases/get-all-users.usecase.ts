import { User } from '../entities/user.entity';
import { IUserRepository } from '../user.repository.interface';

export abstract class IGetAllUsersUsecase {
    abstract execute(): Promise<User[]>;
}

export class GetAllUsersUsecase implements IGetAllUsersUsecase {
    constructor(private readonly repository: IUserRepository) {}

    async execute(): Promise<User[]> {
        return this.repository.getAll();
    }
}
