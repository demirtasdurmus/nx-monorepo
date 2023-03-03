import { InjectModel } from '@nestjs/mongoose';
import { IUserDatabaseDatasource } from '@nx-monorepo/backend/data';
import { Model } from 'mongoose';
import { UserDocument, User } from './schemas/user.schema';

export class UserMongoDatasource implements IUserDatabaseDatasource {
    constructor(
        @InjectModel(User.name)
        private readonly UserModel: Model<UserDocument>,
    ) {}

    async getAll(): Promise<User[]> {
        return this.UserModel.find({}).exec();
    }

    async getById(id: string): Promise<User> {
        return this.UserModel.findOne({ _id: id }).exec();
    }

    async getByEmail(email: string): Promise<User> {
        return this.UserModel.findOne({ email }).select('+password').exec();
    }

    async create(User: User): Promise<User> {
        try {
            const user = await this.UserModel.create(User);
            return user;
        } catch (error) {
            console.log('****', error);
            throw error;
        }
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
