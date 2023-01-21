import { AuthUser } from '@nx-monorepo/backend/core';

export abstract class IAuthDatabaseDatasource {
    abstract login(authUser: AuthUser): Promise<string>;
}
