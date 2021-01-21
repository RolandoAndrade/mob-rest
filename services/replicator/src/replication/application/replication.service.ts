import {BadRequestException, Injectable} from "@nestjs/common";
import {LoggerService} from "../../shared/loggers/domain/logger.service";
import {ReplicationRequestMessages, ReplicationResponseMessages} from "../domain/replication-messages";
import {ReplicatorCoordinatorMessages} from "../../shared/domain/replicator-coordinator-messages";
import {ServerManager} from "../../server-manager/application/server-manager";
import {CommitStatus} from "../domain/commit-status";

@Injectable()
export class ReplicationService{
    constructor(private readonly serverManager: ServerManager, private readonly loggerService: LoggerService) {
        this.serverManager.addEventFromServer(ReplicationRequestMessages.GLOBAL_COMMIT, this.onGlobalCommit.bind(this));
        this.serverManager.addEventFromServer(ReplicationRequestMessages.VOTE_REQUEST, this.onVoteRequest.bind(this))
    }

    async onGlobalCommit() {
        this.loggerService.log("onGlobalCommit: global commit received, making replication", "ReplicationService");
        this.serverManager.sendMessageToServers(ReplicatorCoordinatorMessages.MAKE_REPLICATION);
    }

    async onVoteRequest(commitStatus: CommitStatus) {
        this.loggerService.log("onVoteRequest: vote request received", "ReplicationService");
        if(commitStatus === CommitStatus.COMMIT){
            this.serverManager.sendMessageToServers(ReplicationResponseMessages.VOTE_COMMIT);
        }
        else if(commitStatus === CommitStatus.ABORT){
            this.serverManager.sendMessageToServers(ReplicationResponseMessages.VOTE_ABORT);
        }
    }
}
