import { IBlogRepository } from '../blog.repository.interface';

export abstract class IDeleteBlogByIdUsecase {
    abstract execute(id: string): Promise<void>;
}

export class DeleteBlogByIdUsecase implements IDeleteBlogByIdUsecase {
    constructor(private readonly repository: IBlogRepository) {}

    execute(id: string): Promise<void> {
        return this.repository.deleteById(id);
    }
}
