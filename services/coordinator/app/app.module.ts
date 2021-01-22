import { Module } from '@nestjs/common';
import {ReplicationModule} from "../src/replication/infrastructure/replication.module";
import {AppController} from "./app,controller";
import {RestorationModule} from "../src/restoration/infrastructure/restoration.module";

@Module({
  imports: [ReplicationModule, RestorationModule],
  controllers: [AppController],
})
export class AppModule {}
