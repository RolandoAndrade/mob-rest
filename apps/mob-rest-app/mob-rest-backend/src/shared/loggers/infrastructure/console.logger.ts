import { Logger } from '@nestjs/common';
import { LoggerService } from '../domain/logger.service';

export class ConsoleLogger implements LoggerService {
    private logger: Logger;
    constructor() {
        this.logger = new Logger();
    }

    debug(message: any, context: string = ''): boolean {
        this.logger.debug(message, context);
        return false;
    }

    error(message: any, trace?: string | {}, context: string = ''): boolean {
        this.logger.error(
            message,
            trace ? JSON.stringify(trace) : undefined,
            context,
        );
        return false;
    }

    log(
        message: any,
        context: string = '',
        data: {} | undefined = undefined,
    ): boolean {
        if (data) message += ' ' + JSON.stringify(data);
        this.logger.log(message, context);
        return false;
    }

    warn(message: any, context: string = ''): boolean {
        this.logger.warn(message, context);
        return false;
    }
}
