import { IUser, CreateUserAttrs, UpdateUserAttrs } from './entities/user.entity';

export abstract class IUserRepository {
    abstract getAll(): Promise<IUser[]>;
    abstract getById(id: string): Promise<IUser | null>;
    abstract getByEmail(email: string): Promise<IUser | null>;
    abstract create(createUserAttrs: CreateUserAttrs): Promise<IUser>;
    abstract updateById(id: string, updateUserAttrs: UpdateUserAttrs): Promise<IUser>;
    abstract deleteById(id: string): Promise<void>;
}
