import {Module} from "@nestjs/common";
import {SharedModule} from "../../shared/infrastructure/shared.module";
import {ServerManager} from "../../server-manager/application/server-manager";
import {LoggerService} from "../../shared/loggers/domain/logger.service";
import {ConfigManager} from "../../shared/config/domain/config.manager";
import {RestoreService} from "../application/restore.service";

@Module({
    imports: [SharedModule],
    providers: [RestoreService, {
        provide: ServerManager,
        useFactory: async (config: ConfigManager, logger: LoggerService)=>{
            const sm = new ServerManager(config, logger);
            await sm.fillServers();
            return sm;
        },
        inject: [ConfigManager, LoggerService]
    }],
    exports: [RestoreService]
})

export class RestorationModule{}
