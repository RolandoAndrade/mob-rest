import { Controller, Get } from '@nestjs/common';
import { ReplicationService } from '../src/replication/application/replication.service';
import { CommitStatus } from '../src/replication/domain/commit-status';
import { RestoreService } from '../src/restoration/application/restore.service';

@Controller('test')
export class AppController {
    constructor(
        private readonly replicationService: ReplicationService,
        private readonly restorationService: RestoreService,
    ) {}

    @Get('vote-request')
    voteRequest() {
        this.replicationService.onReplicationRequest(CommitStatus.COMMIT);
    }

    @Get('replication')
    replication() {
        this.restorationService.onRestoreRequest();
    }
}
