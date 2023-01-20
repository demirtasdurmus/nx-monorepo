import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { Blog, IGetAllBlogsUsecase, IGetBlogByIdUsecase, ICreateBlogUsecase } from '@nx-monorepo/backend/core';

@Injectable()
export class BlogService {
    constructor(
        private readonly getAllBlogsUsecase: IGetAllBlogsUsecase,
        private readonly getBlogByIdUsecase: IGetBlogByIdUsecase,
        private readonly createBlogUsecase: ICreateBlogUsecase,
    ) {}

    async getAll(): Promise<Blog[]> {
        return this.getAllBlogsUsecase.execute();
    }

    async getById(id: string): Promise<Blog> {
        return this.getBlogByIdUsecase.execute(id);
    }

    async create(createBlogDto: CreateBlogDto): Promise<Blog> {
        return this.createBlogUsecase.execute(createBlogDto);
    }
}
