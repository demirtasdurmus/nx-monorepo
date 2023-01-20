import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { rainbow } from '@colors/colors/safe';
import { LoggerFactory } from '@nx-monorepo/nest';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: LoggerFactory.createWinstonLogger('api'),
    });

    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    const port = process.env.PORT || 3333;
    await app.listen(port, () => {
        Logger.log(`🚀 ${rainbow(` Application is running on: http://localhost:${port}/${globalPrefix}`)}`);
    });
}

bootstrap();
