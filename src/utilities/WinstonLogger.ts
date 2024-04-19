import { LoggerInterface } from '../interfaces/LoggerInterface';
import { createLogger, format, transports } from 'winston';

export class WinstonLogger implements LoggerInterface {
    private logger;

    constructor() {
        this.logger = createLogger({
            level: 'error',
            format: format.json(),
            transports: [
                new transports.Console(),
                new transports.File({ filename: 'errors.log' })
            ]
        });
    }

    error(message: string, meta: any = {}): void {
        this.logger.error(message, meta);
    }
}
