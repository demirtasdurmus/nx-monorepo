import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { MorganMiddleware } from '@nest-middleware-collection/morgan';

@Injectable()
export class MorganWinstonMiddleware extends MorganMiddleware {
    constructor(@Inject(Logger) private logger: LoggerService) {
        super();
        MorganMiddleware.configure('combined', {
            stream: {
                write: (message: unknown) => this.logger.log(message, MorganWinstonMiddleware.name),
            },
        });
    }
}
