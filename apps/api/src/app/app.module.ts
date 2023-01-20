import { Logger, Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MorganWinstonMiddleware } from '@nx-monorepo/nest';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true })],
    controllers: [],
    providers: [Logger],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(MorganWinstonMiddleware).forRoutes('*');
    }
}
