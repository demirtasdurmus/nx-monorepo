import { CreateUserAttrs, IUser, UpdateUserAttrs } from '@nx-monorepo/backend/core';

export abstract class IUserDatabaseDatasource {
    abstract getAll(): Promise<IUser[]>;
    abstract getById(id: string): Promise<IUser | null>;
    abstract getByEmail(email: string): Promise<IUser | null>;
    abstract create(createUserAttrs: CreateUserAttrs): Promise<IUser>;
    abstract deleteById(id: string): Promise<void>;
    abstract updateById(id: string, updateUserAttrs: UpdateUserAttrs): Promise<IUser>;
}
