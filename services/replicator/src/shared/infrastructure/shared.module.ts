import {Module} from "@nestjs/common";
import {LoggerService} from "../loggers/domain/logger.service";
import {logger} from "../loggers/infrastructure/constant.logger";

@Module({
    providers: [
        {
            provide: LoggerService,
            useValue: logger
        }
    ],
    exports: [LoggerService]
})

export class SharedModule{}
