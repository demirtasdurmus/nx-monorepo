import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { rainbow } from '@colors/colors/safe';
import { LoggerFactory } from '@nx-monorepo/nest';
import { AppModule } from './app/app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: LoggerFactory.createWinstonLogger('api'),
    });

    const configService: ConfigService = app.get(ConfigService);

    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);

    console.log('**', configService.get('API_PORT'));

    const port = configService.get('API_PORT', 8000);

    await app.listen(port, () => {
        Logger.log(`🚀 ${rainbow(` Application is running on: http://localhost:${port}/${globalPrefix}`)}`);
    });
}

bootstrap();
