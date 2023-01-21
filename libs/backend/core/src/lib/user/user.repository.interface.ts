import { User } from './entities/user.entity';

export abstract class IUserRepository {
    abstract getAll(): Promise<User[]>;
    abstract getById(id: string): Promise<User | null>;
    abstract getByEmail(email: string): Promise<User | null>;
    abstract create(User: User): Promise<User>;
    abstract updateById(name: string, UserToUpdate: User): Promise<User>;
    abstract deleteById(name: string): Promise<void>;
}
