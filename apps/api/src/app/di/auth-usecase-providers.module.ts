import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { AuthMongoDatasourceModule } from '../datasources/mongodb/auth/auth-mongodb-datasource.module';
import { IAuthRepository, ILoginUsecase, LoginUsecase } from '@nx-monorepo/backend/core';
import { AuthRepository, IAuthDatabaseDatasource } from '@nx-monorepo/backend/data';

export const AUTH_USECASE_PROVIDERS: Provider[] = [
    {
        inject: [IAuthDatabaseDatasource],
        provide: IAuthRepository,
        useFactory: (authDatabaseDatasource: IAuthDatabaseDatasource) => new AuthRepository(authDatabaseDatasource),
    },
    {
        inject: [IAuthRepository],
        provide: ILoginUsecase,
        useFactory: (repository: IAuthRepository) => new LoginUsecase(repository),
    },
];

@Global()
@Module({})
export class AuthUsecaseProvidersModule {
    static forRoot(): DynamicModule {
        return {
            module: AuthUsecaseProvidersModule,
            imports: [AuthMongoDatasourceModule],
            providers: [...AUTH_USECASE_PROVIDERS],
            exports: [...AUTH_USECASE_PROVIDERS],
        };
    }
}
