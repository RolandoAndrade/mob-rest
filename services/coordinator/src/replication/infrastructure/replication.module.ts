import {Module} from "@nestjs/common";
import {ReplicationService} from "../application/replication.service";
import {SharedModule} from "../../shared/infrastructure/shared.module";
import {ServerManager} from "../../server-manager/application/server-manager";

@Module({
    imports: [SharedModule],
    providers: [ReplicationService, ServerManager],
    exports: [ReplicationService]
})

export class ReplicationModule{}
