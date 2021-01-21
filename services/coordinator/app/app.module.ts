import { Module } from '@nestjs/common';
import {ReplicationModule} from "../src/replication/infrastructure/replication.module";
import {AppController} from "./app,controller";

@Module({
  imports: [ReplicationModule],
  controllers: [AppController],
})
export class AppModule {}
