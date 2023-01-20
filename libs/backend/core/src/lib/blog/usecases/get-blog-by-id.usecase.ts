import { Blog } from '../entities/blog.entity';
import { IBlogRepository } from '../blog.repository.interface';

export abstract class IGetBlogByIdUsecase {
    abstract execute(id: string): Promise<Blog>;
}

export class GetBlogByIdUsecase implements IGetBlogByIdUsecase {
    constructor(private readonly repository: IBlogRepository) {}

    async execute(id: string): Promise<Blog> {
        const blog = await this.repository.getById(id);
        // TODO: create a dedicated exeption lib to handle these cases
        if (blog === undefined) throw new Error('Blog not found.');
        return blog;
    }
}
