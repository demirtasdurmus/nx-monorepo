import * as appRoot from 'app-root-path';
import { format, transports } from 'winston';
import { WinstonModule } from 'nest-winston';
import { nestConsoleFormat } from './nest-console-format';

export type LogLevel = 'debug' | 'info' | 'error' | 'warn' | 'verbose';

export class LoggerFactory {
    private static readonly logsRoot: string = `${appRoot.path}/logs`;

    public static createWinstonLogger(appName = 'Nest') {
        return WinstonModule.createLogger({
            transports: [
                LoggerFactory.createFileTransport(appName, 'error', 'error'),
                LoggerFactory.createFileTransport(appName, 'debug', 'app'),
                LoggerFactory.createConsoleTransport(appName, 'debug'),
            ],
        });
    }

    private static createFileTransport(appName: string, logLevel: LogLevel, fileSuffix: string) {
        return new transports.File({
            level: logLevel,
            filename: `${LoggerFactory.logsRoot}/${appName.toLowerCase()}-${fileSuffix}.log`,
            maxsize: 3145728,
            maxFiles: 10,
            format: format.combine(format.timestamp(), format.json()),
        });
    }

    private static createConsoleTransport(appName = 'Nest', logLevel: LogLevel) {
        return new transports.Console({
            level: logLevel,
            handleExceptions: true,
            format: format.combine(format.timestamp(), nestConsoleFormat(appName)),
        });
    }
}
