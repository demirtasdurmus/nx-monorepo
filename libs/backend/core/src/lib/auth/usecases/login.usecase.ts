import { AuthUser } from '../entities/auth-user.entity';
import { IAuthRepository } from '../auth.repository.interface';

export abstract class ILoginUsecase {
    abstract execute(Auth: AuthUser): Promise<string>;
}

export class LoginUsecase implements ILoginUsecase {
    constructor(private readonly repository: IAuthRepository) {}

    execute(authUser: AuthUser): Promise<string> {
        return this.repository.login(authUser);
    }
}
