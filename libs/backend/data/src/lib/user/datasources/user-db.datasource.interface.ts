import { User } from '@nx-monorepo/backend/core';

export abstract class IUserDatabaseDatasource {
    abstract getAll(): Promise<User[]>;
    abstract getById(id: string): Promise<User | null>;
    abstract getByEmail(email: string): Promise<User | null>;
    abstract create(User: User): Promise<User>;
    abstract deleteById(id: string): Promise<void>;
    abstract updateById(id: string, UserToUpdate: User): Promise<User>;
}
