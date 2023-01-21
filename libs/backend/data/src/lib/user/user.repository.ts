import { User, IUserRepository } from '@nx-monorepo/backend/core';

import { IUserDatabaseDatasource } from './datasources/user-db.datasource.interface';

export class UserRepository implements IUserRepository {
    constructor(private databaseDatasource: IUserDatabaseDatasource) {}

    async getAll(): Promise<User[]> {
        return this.databaseDatasource.getAll();
    }

    async getById(id: string): Promise<User | null> {
        return this.databaseDatasource.getById(id);
    }

    async getByEmail(email: string): Promise<User | null> {
        return this.databaseDatasource.getByEmail(email);
    }

    async create(User: User): Promise<User> {
        return this.databaseDatasource.create(User);
    }

    async updateById(id: string, UserToUpdate: User): Promise<User> {
        return this.databaseDatasource.updateById(id, UserToUpdate);
    }

    async deleteById(id: string): Promise<void> {
        return this.databaseDatasource.deleteById(id);
    }
}
