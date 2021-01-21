import { Module } from '@nestjs/common';
import {ReplicationModule} from "../src/replication/infrastructure/replication.module";

@Module({
  imports: [ReplicationModule],
})
export class AppModule {}
