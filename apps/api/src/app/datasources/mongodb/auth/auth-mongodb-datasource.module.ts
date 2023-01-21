import { Module, Provider } from '@nestjs/common';
import { IAuthDatabaseDatasource } from '@nx-monorepo/backend/data';
import { AuthMongoDatasource } from './auth-mongodb-datasource';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from '../user/schemas/user.schema';

const databaseProvider: Provider = {
    provide: IAuthDatabaseDatasource,
    useClass: AuthMongoDatasource,
};

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    providers: [databaseProvider],
    exports: [databaseProvider],
})
export class AuthMongoDatasourceModule {}
