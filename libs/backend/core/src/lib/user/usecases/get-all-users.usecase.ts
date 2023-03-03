import { IUser } from '../entities/user.entity';
import { IUserRepository } from '../user.repository.interface';

export abstract class IGetAllUsersUsecase {
    abstract execute(): Promise<IUser[]>;
}

export class GetAllUsersUsecase implements IGetAllUsersUsecase {
    constructor(private readonly repository: IUserRepository) {}

    async execute(): Promise<IUser[]> {
        return this.repository.getAll();
    }
}
