import {Controller, Get} from "@nestjs/common";
import {ReplicationService} from "../src/replication/application/replication.service";

@Controller("test")
export class AppController{
    constructor(private readonly replicationService: ReplicationService) {
    }

    @Get("vote-request")
    voteRequest(){
        this.replicationService.onReplicationRequest(undefined, undefined);
    }
}
