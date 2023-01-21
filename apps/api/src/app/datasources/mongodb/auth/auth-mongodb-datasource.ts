import { InjectModel } from '@nestjs/mongoose';
import { IAuthDatabaseDatasource } from '@nx-monorepo/backend/data';
import { Model } from 'mongoose';
import { UserDocument, User } from '../user/schemas/user.schema';

export class AuthMongoDatasource implements IAuthDatabaseDatasource {
    constructor(
        @InjectModel(User.name)
        private readonly UserModel: Model<UserDocument>,
    ) {}

    async login(user: User): Promise<string> {
        const test = await this.UserModel.find({ email: user.email });
        return 'test';
    }
}
