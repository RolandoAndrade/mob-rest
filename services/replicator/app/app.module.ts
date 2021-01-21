import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import {ReplicationModule} from "../src/replication/infrastructure/replication.module";

@Module({
  imports: [ReplicationModule],
  providers: [AppService],
})
export class AppModule {}
