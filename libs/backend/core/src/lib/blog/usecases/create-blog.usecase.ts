import { Blog } from '../entities/blog.entity';
import { IBlogRepository } from '../blog.repository.interface';

export abstract class ICreateBlogUsecase {
    abstract execute(blog: Blog): Promise<Blog>;
}

export class CreateBlogUsecase implements ICreateBlogUsecase {
    constructor(private readonly repository: IBlogRepository) {}

    execute(blog: Blog): Promise<Blog> {
        return this.repository.create(blog);
    }
}
