import {Controller, Get} from "@nestjs/common";
import {ReplicationService} from "../src/replication/application/replication.service";
import {CommitStatus} from "../src/replication/domain/commit-status";

@Controller("test")
export class AppController{
    constructor(private readonly replicationService: ReplicationService) {
    }

    @Get("vote-request")
    voteRequest(){
        this.replicationService.onReplicationRequest(CommitStatus.COMMIT);
    }
}
