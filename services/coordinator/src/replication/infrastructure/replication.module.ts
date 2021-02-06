import { Module } from '@nestjs/common';
import { ReplicationService } from '../application/replication.service';
import { SharedModule } from '../../shared/infrastructure/shared.module';
import { ServerManagerModule } from '../../server-manager/infrastructure/server-manager.module';

@Module({
    imports: [SharedModule, ServerManagerModule],
    providers: [ReplicationService],
    exports: [ReplicationService],
})
export class ReplicationModule {}
