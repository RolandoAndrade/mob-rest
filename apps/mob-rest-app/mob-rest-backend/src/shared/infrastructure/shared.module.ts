import { Module } from '@nestjs/common';
import { LoggerService } from '../loggers/domain/logger.service';
import { logger } from '../loggers/infrastructure/constant.logger';
import { ConfigManager } from '../config/domain/config.manager';
import { ConfigService } from '../config/infrastructure/config.service';

@Module({
    providers: [
        {
            provide: LoggerService,
            useValue: logger,
        },
        {
            provide: ConfigManager,
            useClass: ConfigService,
        },
    ],
    exports: [LoggerService, ConfigManager],
})
export class SharedModule {}
