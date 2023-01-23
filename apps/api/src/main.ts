import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { rainbow } from '@colors/colors/safe';
import { LoggerFactory } from '@nx-monorepo/nest';
import { AppModule } from './app/app.module';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: LoggerFactory.createWinstonLogger('api'),
    });

    app.use(helmet());

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true, // check ValidationPipeOptions and its parent class for more options
            // transform?: boolean;
            // disableErrorMessages?: boolean;
            // transformOptions?: ClassTransformOptions;
            // errorHttpStatusCode?: ErrorHttpStatusCode;
            // exceptionFactory?: (errors: ValidationError[]) => any;
            // validateCustomDecorators?: boolean;
            // expectedType?: Type<any>;
            // validatorPackage?: ValidatorPackage;
            // transformerPackage?: TransformerPackage;
        }),
    );

    app.enableCors({
        credentials: true,
        origin: '*',
    });

    app.use(cookieParser());

    const configService: ConfigService = app.get(ConfigService);

    const globalPrefix = configService.get('GLOBAL_API_PREFIX', 'api/v1');
    const port = configService.get('API_PORT', 8000);

    app.setGlobalPrefix(globalPrefix);

    await app.listen(port, () => {
        Logger.log(`🚀 ${rainbow(` Application is running on: http://localhost:${port}/${globalPrefix}`)}`);
    });
}

bootstrap();
