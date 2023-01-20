import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { BlogUsecaseProvidersModule } from '../../di/blog-usecase-providers.module';

@Module({
    imports: [BlogUsecaseProvidersModule.forRoot()],
    controllers: [BlogController],
    providers: [BlogService],
})
export class BlogModule {}
