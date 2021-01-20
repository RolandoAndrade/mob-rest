import {Injectable} from "@nestjs/common";
import {SubscribeMessage, WebSocketServer} from "@nestjs/websockets";
import {Server, Socket} from "socket.io";
import {
    MOBCoordinatorMessages,
    ReplicationRequestMessages,
    ReplicationResponseMessages
} from "../domain/replication-messages";
import {LoggerService} from "../../shared/loggers/domain/logger.service";
import {ServerManager} from "../../server-manager/application/server-manager";

@Injectable()
export class ReplicationService{
    @WebSocketServer()
    server: Server;

    private isAReplicationRequestInProgress: boolean = false;
    private votesRemaining: number;
    private commitVotes: number;
    private abortVotes: number;

    constructor(private readonly serverManager: ServerManager, private readonly loggerService: LoggerService) {
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
        this.loggerService.log("onVoteCommit: server accepted the request", "ReplicationService", --this.votesRemaining);
        if(this.votesRemaining === 0){
            if(this.commitVotes === this.serverManager.getNumberOfVotes()){
                this.loggerService.log("onVoteCommit: all votes are commit", "ReplicationService");
                this.serverManager.sendMessageToReplicationServers(ReplicationRequestMessages.GLOBAL_COMMIT);
            }
            else {
                this.loggerService.log("onVoteCommit: aborting", "ReplicationService", {
                    commit: this.commitVotes,
                    abort: this.abortVotes
                });
            }
            this.isAReplicationRequestInProgress = false;
        }
    }

    @SubscribeMessage(ReplicationResponseMessages.VOTE_COMMIT)
    async onVoteAbort(client: Socket, username: string) {
        this.loggerService.log("onVoteAbort: server aborted the request", "ReplicationService", --this.votesRemaining);
        if(this.votesRemaining === 0){
            this.loggerService.log("onVoteAbort: aborting", "ReplicationService", {
                commit: this.commitVotes,
                abort: this.abortVotes
            });
            this.isAReplicationRequestInProgress = false;
        }
    }

    private async startReplicationProcess(){
        this.loggerService.log("startReplicationProcess: starting replication process",
            "ReplicationService");
        this.isAReplicationRequestInProgress = true;
        this.votesRemaining = this.serverManager.getNumberOfVotes();
        this.serverManager.sendMessageToReplicationServers(ReplicationRequestMessages.VOTE_REQUEST);
        // now the system is counting the incoming votes
    }
}
