import {Module} from "@nestjs/common";
import {ReplicationService} from "../application/replication.service";
import {SharedModule} from "../../shared/infrastructure/shared.module";
import {ServerManager} from "../../server-manager/application/server-manager";
import {ConfigManager} from "../../shared/config/domain/config.manager";
import {LoggerService} from "../../shared/loggers/domain/logger.service";

@Module({
    imports: [SharedModule],
    providers: [ReplicationService, {
        provide: ServerManager,
        useFactory: async (config: ConfigManager, logger: LoggerService)=>{
            const sm = new ServerManager(config, logger);
            await sm.fillServers();
            return sm;
        },
        inject: [ConfigManager, LoggerService]
    }],
    exports: [ReplicationService]
})

export class ReplicationModule{}
