import {Injectable} from "@nestjs/common";
import {SubscribeMessage, WebSocketServer} from "@nestjs/websockets";
import {Server, Socket} from "socket.io";
import {LoggerService} from "../../shared/loggers/domain/logger.service";
import {ReplicationRequestMessages, ReplicationResponseMessages} from "../domain/replication-messages";
import {ReplicatorCoordinatorMessages} from "../../shared/domain/replicator-coordinator-messages";


@Injectable()
export class ReplicationService{
    @WebSocketServer()
    server: Server;

    constructor(private readonly loggerService: LoggerService) {
    }

    @SubscribeMessage(ReplicationRequestMessages.GLOBAL_COMMIT)
    async onGlobalCommit(client: Socket, username: string) {
        this.loggerService.log("onGlobalCommit: global commit received, making replication", "ReplicationService");
        this.server.emit(ReplicatorCoordinatorMessages.MAKE_REPLICATION);
    }

    @SubscribeMessage(ReplicationRequestMessages.VOTE_REQUEST)
    async onVoteRequest(client: Socket, username: string) {
        this.loggerService.log("onVoteRequest: vote request received", "ReplicationService");
        this.server.emit(ReplicationResponseMessages.VOTE_COMMIT);
    }
}
