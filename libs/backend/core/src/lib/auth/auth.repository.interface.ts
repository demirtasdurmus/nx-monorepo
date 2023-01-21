import { AuthUser } from './entities/auth-user.entity';

export abstract class IAuthRepository {
    abstract login(auth: AuthUser): Promise<string>;
}
