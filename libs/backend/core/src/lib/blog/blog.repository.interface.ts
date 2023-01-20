import { Blog } from './entities/blog.entity';

export abstract class IBlogRepository {
    abstract getAll(): Promise<Blog[]>;
    abstract getById(id: string): Promise<Blog | undefined>;
    abstract create(blog: Blog): Promise<Blog>;
    abstract updateById(name: string, blogToUpdate: Blog): Promise<Blog>;
    abstract deleteById(name: string): Promise<void>;
}
