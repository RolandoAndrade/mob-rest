import {Injectable} from "@nestjs/common";
import {SubscribeMessage, WebSocketServer} from "@nestjs/websockets";
import {Server, Socket} from "socket.io";
import {
    MOBCoordinatorMessages,
    ReplicationRequestMessages,
    ReplicationResponseMessages
} from "../domain/replication-messages";
import {LoggerService} from "../../shared/loggers/domain/logger.service";
import {ConfigOptions} from "../../shared/config/domain/config.options";
import {openConnection} from "../../shared/sockets/domain/open-connection";

@Injectable()
export class ReplicationService{
    @WebSocketServer()
    server: Server;

    private isAReplicationRequestInProgress: boolean = false;
    private replicationServers: Socket[] = [];
    private votesRemaining: number = 0;

    constructor(private readonly configService: ConfigOptions, private readonly loggerService: LoggerService) {
    }

    @SubscribeMessage(MOBCoordinatorMessages.REPLICATE_OBJECTS)
    async onReplicationRequest(client: Socket, username: string) {
        this.loggerService.log("onReplicationRequest: request of replication in progress", "ReplicationService");
        if(this.isAReplicationRequestInProgress){
            this.loggerService.warn("onReplicationRequest: the is a request in progress, try again later", "ReplicationService");
        }
        else {
            await this.startReplicationProcess();
        }
    }

    @SubscribeMessage(ReplicationResponseMessages.VOTE_COMMIT)
    async onVoteCommit(client: Socket, username: string) {
        this.loggerService.log("onVoteCommit: server accept the request", "ReplicationService", --this.votesRemaining);
        if(this.votesRemaining === 0){
            this.loggerService.log("onVoteCommit: all votes are commit", "ReplicationService");
            this.sendMessageToReplicationServers(ReplicationRequestMessages.GLOBAL_COMMIT);
            this.isAReplicationRequestInProgress = false;
        }
    }

    private sendMessageToReplicationServers(message: string){
        this.loggerService.log("sendMessageToReplicationServers: sending message to replication servers",
            "ReplicationService", {message});
        for(const server of this.replicationServers){
            server.emit(message);
        }
    }

    private async openConnections(){
        if(this.replicationServers.length === 0){
            for(const host of this.configService.replicationServers){
                this.replicationServers.push(await openConnection(host.port, host.address));
            }
            this.votesRemaining = this.replicationServers.length;
        }
    }

    private async startReplicationProcess(){
        this.loggerService.log("startReplicationProcess: starting replication process",
            "ReplicationService");
        this.isAReplicationRequestInProgress = true;
        await this.openConnections();
        this.sendMessageToReplicationServers(ReplicationRequestMessages.VOTE_REQUEST);
        // now the system is counting the incoming votes
    }
}
