import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
// import { BlogEndpoints } from '../../lib/common/api-interface';
import { Blog } from '@nx-monorepo/backend/core';

@Controller('blogs')
export class BlogController {
    constructor(private readonly blogService: BlogService) {}

    @Get()
    async getAll(): Promise<Blog[]> {
        return this.blogService.getAll();
    }

    @Get(':id')
    async getByName(@Param('id') id: string): Promise<Blog> {
        return this.blogService.getById(id);
    }

    @Post()
    async create(@Body() createBlogDto: CreateBlogDto): Promise<Blog> {
        return this.blogService.create(createBlogDto);
    }
}
