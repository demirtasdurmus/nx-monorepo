import { InjectModel } from '@nestjs/mongoose';
// import { Blog } from '@nx-monorepo/backend/core';
import { IBlogDatabaseDatasource } from '@nx-monorepo/backend/data';
import { Model } from 'mongoose';
import { BlogDocument, Blog } from './schemas/blog.schema';

export class BlogMongoDatasource implements IBlogDatabaseDatasource {
    constructor(
        @InjectModel(Blog.name)
        private readonly blogModel: Model<BlogDocument>,
    ) {}

    getAll(): Promise<Blog[]> {
        return this.blogModel.find({}).exec();
    }

    getById(id: string): Promise<Blog> {
        return this.blogModel.findOne({ _id: id }).exec();
    }

    create(blog: Blog): Promise<Blog> {
        return this.blogModel.create(blog);
    }

    async updateById(id: string, blogToUpdate: Blog): Promise<Blog> {
        const result = await this.blogModel.updateOne({ id }, { ...blogToUpdate }).exec();

        if (result.modifiedCount === 0) {
            // TODO: think about exception handling
            throw new Error('The blog could not updated.');
        }
        return { ...blogToUpdate };
    }

    async deleteById(id: string): Promise<void> {
        await this.blogModel.deleteOne({ id });
    }
}
