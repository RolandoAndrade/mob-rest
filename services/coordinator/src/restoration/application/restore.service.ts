import {Injectable} from "@nestjs/common";
import {SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {Server, Socket} from "socket.io";
import {LoggerService} from "../../shared/loggers/domain/logger.service";
import {ServerManager} from "../../server-manager/application/server-manager";
import * as fs from "fs";
import {ConfigManager} from "../../shared/config/domain/config.manager";
import {RestorationMessages} from "../domain/restoration-messages";
import {MOBCoordinatorMessages} from "../../shared/domain/mob-coordinator-messages";

@WebSocketGateway()
@Injectable()
export class RestoreService{
    @WebSocketServer()
    server: Server;

    private restoredObjects: string[] = [];

    constructor(private readonly serverManager: ServerManager,
                private readonly configManager: ConfigManager,
                private readonly loggerService: LoggerService) {
        serverManager.addEventFromServer(MOBCoordinatorMessages.RESTORE_OBJECTS, this.onRestoreRequest)
    }

    async onRestoreRequest() {
        this.loggerService.log("onRestoreRequest: request of restoration in progress", "ReplicationService");
        this.restoredObjects = [];
        this.server.emit(RestorationMessages.RETRIEVE_OBJECTS);
    }


    private mode(): string{
        return this.restoredObjects.sort((a,b) =>
            this.restoredObjects.filter(v => v===a).length
            - this.restoredObjects.filter(v => v===b).length
        ).pop();
    }

    @SubscribeMessage(RestorationMessages.RECEIVED_OBJECTS)
    async onReceivedObject(client: Socket, base64StringData: string) {
        this.loggerService.log("onReceivedObject: received objects", "ReplicationService");
        this.restoredObjects.push(base64StringData);
        if(this.restoredObjects === (this.server.engine as any).clientsCount){
            this.loggerService.log("onReceivedObject: received all objects, comparing them", "ReplicationService");
            const areAllReceivedElementsEqual = this.restoredObjects.every(element=>element===base64StringData);
            if(areAllReceivedElementsEqual){
                this.loggerService.debug("onReceivedObject: all received elements are equal, restoring the information", "ReplicationService");
                fs.writeFileSync(this.configManager.get("repository"), base64StringData, 'base64')
            }
            else {
                this.loggerService.warn("onReceivedObject: there are objects that don't equal, restoring the mode element", "ReplicationService");
                fs.writeFileSync(this.configManager.get("repository"), this.mode(), 'base64')
            }
            this.loggerService.debug(`onReplicationStart: saved a file at ${this.configManager.get("repository")}`, "ReplicationService");
        }
    }

}
