import { Logger, Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { MorganWinstonMiddleware } from '@nx-monorepo/nest';
import { BlogModule } from './modules/blog/blog.module';
import { MongoDBUtil } from './utils/mongo-db-util';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService): Promise<MongooseModuleOptions> => ({
                uri: MongoDBUtil.getConnectionUri(configService),
                // socketTimeoutMS: 15000,
                // useCreateIndex: true,
                // autoIndex: true,
                // useFindAndModify: false,
                // useNewUrlParser: true,
                // useUnifiedTopology: true,
            }),
            inject: [ConfigService],
        }),
        BlogModule,
    ],
    providers: [Logger],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(MorganWinstonMiddleware).forRoutes('*');
    }
}
