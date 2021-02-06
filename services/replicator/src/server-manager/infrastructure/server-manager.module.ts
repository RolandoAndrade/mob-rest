import { SharedModule } from '../../shared/infrastructure/shared.module';
import { LoggerService } from '../../shared/loggers/domain/logger.service';
import { ConfigManager } from '../../shared/config/domain/config.manager';
import { Module } from '@nestjs/common';
import { ServerManager } from '../application/server-manager';
@Module({
    imports: [SharedModule],
    providers: [
        {
            provide: ServerManager,
            useFactory: async (
                config: ConfigManager,
                logger: LoggerService,
            ) => {
                const serverManager = new ServerManager(config, logger);
                await serverManager.fillServers();
                return serverManager;
            },
            inject: [ConfigManager, LoggerService],
        },
    ],
    exports: [ServerManager],
})
export class ServerManagerModule {}
