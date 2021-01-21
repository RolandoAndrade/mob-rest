import {Injectable} from "@nestjs/common";
import {SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {Server, Socket} from "socket.io";
import {
    MOBCoordinatorMessages,
    ReplicationRequestMessages,
    ReplicationResponseMessages, ReplicatorCoordinatorMessages
} from "../domain/replication-messages";
import {LoggerService} from "../../shared/loggers/domain/logger.service";
import {ServerManager} from "../../server-manager/application/server-manager";

@WebSocketGateway()
@Injectable()
export class ReplicationService{
    @WebSocketServer()
    server: Server;

    private isAReplicationRequestInProgress: boolean = false;
    private votesRemaining: number;
    private commitVotes: number;
    private abortVotes: number;

    constructor(private readonly serverManager: ServerManager, private readonly loggerService: LoggerService) {
        serverManager.addEventFromServer(MOBCoordinatorMessages.REPLICATE_OBJECTS, this.onReplicationRequest)
    }

    async onReplicationRequest() {
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
        this.loggerService.log("onVoteCommit: server accepted the request", "ReplicationService", {
            votesRemaining: --this.votesRemaining,
            commits: ++this.commitVotes,
            aborts: this.abortVotes
        });

        if(this.votesRemaining === 0){
            if(this.commitVotes === (this.server.engine as any).clientsCount){
                this.loggerService.log("onVoteCommit: all votes are commit", "ReplicationService");
                this.server.emit(ReplicationRequestMessages.GLOBAL_COMMIT);
            }
            else {
                this.server.emit(ReplicationRequestMessages.GLOBAL_ABORT);
            }
            this.isAReplicationRequestInProgress = false;
        }
    }

    @SubscribeMessage(ReplicationResponseMessages.VOTE_ABORT)
    async onVoteAbort(client: Socket, username: string) {
        this.loggerService.log("onVoteAbort: server aborted the request", "ReplicationService", {
            votesRemaining: --this.votesRemaining,
            commits: this.commitVotes,
            aborts: ++this.abortVotes
        });
        if(this.votesRemaining === 0){
            this.server.emit(ReplicationRequestMessages.GLOBAL_ABORT);
            this.isAReplicationRequestInProgress = false;
        }
    }

    @SubscribeMessage(ReplicatorCoordinatorMessages.MAKE_REPLICATION)
    async onMakeReplication(client: Socket, username: string) {
        this.loggerService.log("onMakeReplication: sending objects", "ReplicationService");
        this.server.emit("replication", [{
            name: "object"
        }])
    }

    private async startReplicationProcess(){
        this.loggerService.log("startReplicationProcess: starting replication process",
            "ReplicationService");
        this.isAReplicationRequestInProgress = true;
        this.votesRemaining = (this.server.engine as any).clientsCount;
        this.commitVotes = 0;
        this.abortVotes = 0;
        this.server.emit(ReplicationRequestMessages.VOTE_REQUEST);
        // now the system is counting the incoming votes
    }
}
