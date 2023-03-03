import { IUserRepository } from '../user.repository.interface';

export abstract class IDeleteUserByIdUsecase {
    abstract execute(id: string): Promise<void>;
}

export class DeleteUserByIdUsecase implements IDeleteUserByIdUsecase {
    constructor(private readonly repository: IUserRepository) {}

    async execute(id: string): Promise<void> {
        return this.repository.deleteById(id);
    }
}
