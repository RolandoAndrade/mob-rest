import {Module} from "@nestjs/common";
import {ReplicationService} from "../application/replication.service";
import {SharedModule} from "../../shared/infrastructure/shared.module";

@Module({
    imports: [SharedModule],
    providers: [ReplicationService],
})

export class ReplicationModule{}
