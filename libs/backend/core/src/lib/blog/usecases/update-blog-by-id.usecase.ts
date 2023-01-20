import { Blog } from '../entities/blog.entity';
import { IBlogRepository } from '../blog.repository.interface';

export abstract class IUpdateBlogByIdUsecase {
    abstract execute(id: string, blogToUpdate: Blog): Promise<Blog>;
}

export class UpdateBlogByIdUsecase implements IUpdateBlogByIdUsecase {
    constructor(private readonly repository: IBlogRepository) {}

    execute(id: string, blogToUpdate: Blog): Promise<Blog> {
        return this.repository.updateById(id, blogToUpdate);
    }
}
