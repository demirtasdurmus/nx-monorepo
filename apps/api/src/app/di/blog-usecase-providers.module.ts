import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { BlogMongoDatasourceModule } from '../datasources/mongodb/blog/blog-mongodb-datasource.module';
import {
    CreateBlogUsecase,
    DeleteBlogByIdUsecase,
    GetAllBlogsUsecase,
    GetBlogByIdUsecase,
    ICreateBlogUsecase,
    IDeleteBlogByIdUsecase,
    IBlogRepository,
    IGetAllBlogsUsecase,
    IGetBlogByIdUsecase,
    IUpdateBlogByIdUsecase,
    UpdateBlogByIdUsecase,
} from '@nx-monorepo/backend/core';
import { BlogRepository, IBlogDatabaseDatasource } from '@nx-monorepo/backend/data';

export const BLOG_USECASE_PROVIDERS: Provider[] = [
    {
        inject: [IBlogDatabaseDatasource],
        provide: IBlogRepository,
        useFactory: (blogDatabaseDatasource: IBlogDatabaseDatasource) => new BlogRepository(blogDatabaseDatasource),
    },
    {
        inject: [IBlogRepository],
        provide: IGetAllBlogsUsecase,
        useFactory: (repository: IBlogRepository) => new GetAllBlogsUsecase(repository),
    },
    {
        inject: [IBlogRepository],
        provide: IGetBlogByIdUsecase,
        useFactory: (repository: IBlogRepository) => new GetBlogByIdUsecase(repository),
    },
    {
        inject: [IBlogRepository],
        provide: ICreateBlogUsecase,
        useFactory: (repository: IBlogRepository) => new CreateBlogUsecase(repository),
    },
    {
        inject: [IBlogRepository],
        provide: IUpdateBlogByIdUsecase,
        useFactory: (repository: IBlogRepository) => new UpdateBlogByIdUsecase(repository),
    },
    {
        inject: [IBlogRepository],
        provide: IDeleteBlogByIdUsecase,
        useFactory: (repository: IBlogRepository) => new DeleteBlogByIdUsecase(repository),
    },
];

@Global()
@Module({})
export class BlogUsecaseProvidersModule {
    static forRoot(): DynamicModule {
        return {
            module: BlogUsecaseProvidersModule,
            imports: [BlogMongoDatasourceModule],
            providers: [...BLOG_USECASE_PROVIDERS],
            exports: [...BLOG_USECASE_PROVIDERS],
        };
    }
}
