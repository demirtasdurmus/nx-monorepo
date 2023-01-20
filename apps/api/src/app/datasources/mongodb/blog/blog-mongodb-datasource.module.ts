import { Module, Provider } from '@nestjs/common';
import { IBlogDatabaseDatasource } from '@nx-monorepo/backend/data';
import { BlogMongoDatasource } from './blog-mongodb-datasource';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogSchema, Blog } from './schemas/blog.schema';

const databaseProvider: Provider = {
    provide: IBlogDatabaseDatasource,
    useClass: BlogMongoDatasource,
};

@Module({
    imports: [MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }])],
    providers: [databaseProvider],
    exports: [databaseProvider],
})
export class BlogMongoDatasourceModule {}
