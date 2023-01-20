import { Blog, IBlogRepository } from '@nx-monorepo/backend/core';

import { IBlogDatabaseDatasource } from './datasources/blog-db.datasource.interface';

export class BlogRepository implements IBlogRepository {
    constructor(private databaseDatasource: IBlogDatabaseDatasource) {}

    async getAll(): Promise<Blog[]> {
        return this.databaseDatasource.getAll();
    }

    async getById(id: string): Promise<Blog | undefined> {
        return this.databaseDatasource.getById(id);
    }

    async create(blog: Blog): Promise<Blog> {
        return this.databaseDatasource.create(blog);
    }

    async updateById(id: string, blogToUpdate: Blog): Promise<Blog> {
        return this.databaseDatasource.updateById(id, blogToUpdate);
    }

    async deleteById(id: string): Promise<void> {
        return this.databaseDatasource.deleteById(id);
    }
}
