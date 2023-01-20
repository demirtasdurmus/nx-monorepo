import { Blog } from '@nx-monorepo/backend/core';

export abstract class IBlogDatabaseDatasource {
    abstract getAll(): Promise<Blog[]>;
    abstract getById(id: string): Promise<Blog | undefined>;
    abstract create(blog: Blog): Promise<Blog>;
    abstract deleteById(id: string): Promise<void>;
    abstract updateById(id: string, blogToUpdate: Blog): Promise<Blog>;
}
