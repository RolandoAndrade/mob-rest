import {Injectable} from "@nestjs/common";
import {LoggerService} from "../../shared/loggers/domain/logger.service";
import {ServerManager} from "../../server-manager/application/server-manager";
import * as fs from "fs";
import {ConfigManager} from "../../shared/config/domain/config.manager";
import {RestorationMessages} from "../domain/restoration-messages";

@Injectable()
export class RestoreService{
    constructor(private readonly serverManager: ServerManager,
                private readonly configManager: ConfigManager,
                private readonly loggerService: LoggerService) {
        this.serverManager.addEventFromServer(RestorationMessages.RETRIEVE_OBJECTS, this.onRetrieveObjects.bind(this));
    }

    async onRetrieveObjects() {
        this.loggerService.log("onRetrieveObjects: sending replication file", "ReplicationService");
        const file = fs.readFileSync(this.configManager.get("repository")).toString('base64');
        this.serverManager.sendMessageToServers(RestorationMessages.RECEIVED_OBJECTS, file);
    }
}
