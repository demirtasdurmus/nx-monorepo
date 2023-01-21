import { AuthUser, IAuthRepository } from '@nx-monorepo/backend/core';

import { IAuthDatabaseDatasource } from './datasources/auth-db.datasource.interface';

export class AuthRepository implements IAuthRepository {
    constructor(private databaseDatasource: IAuthDatabaseDatasource) {}

    async login(authUser: AuthUser): Promise<string> {
        return this.databaseDatasource.login(authUser);
    }
}
