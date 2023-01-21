import { InjectModel } from '@nestjs/mongoose';
// import { User } from '@nx-monorepo/backend/core';
import { IUserDatabaseDatasource } from '@nx-monorepo/backend/data';
import { Model } from 'mongoose';
import { UserDocument, User } from './schemas/user.schema';

export class UserMongoDatasource implements IUserDatabaseDatasource {
    constructor(
        @InjectModel(User.name)
        private readonly UserModel: Model<UserDocument>,
    ) {}

    getAll(): Promise<User[]> {
        return this.UserModel.find({}).exec();
    }

    getById(id: string): Promise<User> {
        return this.UserModel.findOne({ _id: id }).exec();
    }

    getByEmail(email: string): Promise<User> {
        return this.UserModel.findOne({ email }).exec();
    }

    create(User: User): Promise<User> {
        return this.UserModel.create(User);
    }

    async updateById(id: string, UserToUpdate: User): Promise<User> {
        const result = await this.UserModel.updateOne({ id }, { ...UserToUpdate }).exec();

        if (result.modifiedCount === 0) {
            // TODO: think about exception handling
            throw new Error('The User could not updated.');
        }
        return { ...UserToUpdate };
    }

    async deleteById(id: string): Promise<void> {
        await this.UserModel.deleteOne({ id });
    }
}
