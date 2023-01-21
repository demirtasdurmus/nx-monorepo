import { Module, Provider } from '@nestjs/common';
import { IUserDatabaseDatasource } from '@nx-monorepo/backend/data';
import { UserMongoDatasource } from './user-mongodb-datasource';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from './schemas/user.schema';

const databaseProvider: Provider = {
    provide: IUserDatabaseDatasource,
    useClass: UserMongoDatasource,
};

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    providers: [databaseProvider],
    exports: [databaseProvider],
})
export class UserMongoDatasourceModule {}
