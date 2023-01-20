import { Blog } from '../entities/blog.entity';
import { IBlogRepository } from '../blog.repository.interface';

export abstract class IGetAllBlogsUsecase {
    abstract execute(): Promise<Blog[]>;
}

export class GetAllBlogsUsecase implements IGetAllBlogsUsecase {
    constructor(private readonly repository: IBlogRepository) {}

    async execute(): Promise<Blog[]> {
        return this.repository.getAll();
    }
}
