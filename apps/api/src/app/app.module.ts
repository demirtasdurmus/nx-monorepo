import { Logger, Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MorganWinstonMiddleware } from '@nx-monorepo/nest';
import { BlogModule } from './modules/blog/blog.module';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), MongooseModule.forRoot('mongodb://localhost/nest'), BlogModule],
    controllers: [],
    providers: [Logger],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(MorganWinstonMiddleware).forRoutes('*');
    }
}
