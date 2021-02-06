import { Module } from '@nestjs/common';
import { ReplicationModule } from '../src/replication/infrastructure/replication.module';
import { RestorationModule } from '../src/restoration/infrastructure/restoration.module';

@Module({
    imports: [ReplicationModule, RestorationModule],
})
export class AppModule {}
