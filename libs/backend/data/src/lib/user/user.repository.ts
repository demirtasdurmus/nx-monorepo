import { CreateUserAttrs, IUser, IUserRepository, UpdateUserAttrs } from '@nx-monorepo/backend/core';

import { IUserDatabaseDatasource } from './datasources/user-db.datasource.interface';

export class UserRepository implements IUserRepository {
    constructor(private databaseDatasource: IUserDatabaseDatasource) {}

    async getAll(): Promise<IUser[]> {
        return this.databaseDatasource.getAll();
    }

    async getById(id: string): Promise<IUser | null> {
        return this.databaseDatasource.getById(id);
    }

    async getByEmail(email: string): Promise<IUser | null> {
        return this.databaseDatasource.getByEmail(email);
    }

    async create(createUserAttrs: CreateUserAttrs): Promise<IUser> {
        return this.databaseDatasource.create(createUserAttrs);
    }

    async updateById(id: string, updateUserAttrs: UpdateUserAttrs): Promise<IUser> {
        return this.databaseDatasource.updateById(id, updateUserAttrs);
    }

    async deleteById(id: string): Promise<void> {
        return this.databaseDatasource.deleteById(id);
    }
}
