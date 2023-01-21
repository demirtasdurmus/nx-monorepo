import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { UserMongoDatasourceModule } from '../datasources/mongodb/user/user-mongodb-datasource.module';
import {
    CreateUserUsecase,
    DeleteUserByIdUsecase,
    GetAllUsersUsecase,
    GetUserByIdUsecase,
    ICreateUserUsecase,
    IDeleteUserByIdUsecase,
    IUserRepository,
    IGetAllUsersUsecase,
    IGetUserByIdUsecase,
    IGetUserByEmailUsecase,
    GetUserByEmailUsecase,
    IUpdateUserByIdUsecase,
    UpdateUserByIdUsecase,
} from '@nx-monorepo/backend/core';
import { UserRepository, IUserDatabaseDatasource } from '@nx-monorepo/backend/data';

export const USER_USECASE_PROVIDERS: Provider[] = [
    {
        inject: [IUserDatabaseDatasource],
        provide: IUserRepository,
        useFactory: (userDatabaseDatasource: IUserDatabaseDatasource) => new UserRepository(userDatabaseDatasource),
    },
    {
        inject: [IUserRepository],
        provide: IGetAllUsersUsecase,
        useFactory: (repository: IUserRepository) => new GetAllUsersUsecase(repository),
    },
    {
        inject: [IUserRepository],
        provide: IGetUserByIdUsecase,
        useFactory: (repository: IUserRepository) => new GetUserByIdUsecase(repository),
    },
    {
        inject: [IUserRepository],
        provide: IGetUserByEmailUsecase,
        useFactory: (repository: IUserRepository) => new GetUserByEmailUsecase(repository),
    },
    {
        inject: [IUserRepository],
        provide: ICreateUserUsecase,
        useFactory: (repository: IUserRepository) => new CreateUserUsecase(repository),
    },
    {
        inject: [IUserRepository],
        provide: IUpdateUserByIdUsecase,
        useFactory: (repository: IUserRepository) => new UpdateUserByIdUsecase(repository),
    },
    {
        inject: [IUserRepository],
        provide: IDeleteUserByIdUsecase,
        useFactory: (repository: IUserRepository) => new DeleteUserByIdUsecase(repository),
    },
];

@Global()
@Module({})
export class UserUsecaseProvidersModule {
    static forRoot(): DynamicModule {
        return {
            module: UserUsecaseProvidersModule,
            imports: [UserMongoDatasourceModule],
            providers: [...USER_USECASE_PROVIDERS],
            exports: [...USER_USECASE_PROVIDERS],
        };
    }
}
