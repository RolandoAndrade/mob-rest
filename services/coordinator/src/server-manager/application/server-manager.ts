import {ConfigManager} from "../../shared/config/domain/config.manager";
import {Injectable} from "@nestjs/common";
import {openConnection} from "../../shared/sockets/domain/open-connection";
import {Host} from "../../shared/config/domain/host";
import {LoggerService} from "../../shared/loggers/domain/logger.service";
import {ReplicationRequestMessages} from "../../replication/domain/replication-messages";
import {Socket} from "socket.io";

@Injectable()
export class ServerManager{
    private static replicationServers: Socket[] = [];
    constructor(private readonly configManager: ConfigManager, private readonly loggerService: LoggerService) {
        if(ServerManager.replicationServers.length === 0){
            this.fillReplicationServers();
        }
    }

    private async fillReplicationServers(){
        this.loggerService.log("fillReplicationServers: starting connection", "ServerManager")
        const servers: Host[] = this.configManager.get("replicationServers");
        for(const server of servers){
            ServerManager.replicationServers.push(await openConnection(server.port, server.address))
        }
    }

    public sendMessageToReplicationServers(message: string, data?: any){
        this.loggerService.log("sendMessageToReplicationServers: sending message to replication servers",
            "ServerManager", {message});
        for(const server of ServerManager.replicationServers){
            console.log( server.emit(message));
        }
    }

    public getNumberOfVotes(): number{
        return ServerManager.replicationServers.length;
    }
}
