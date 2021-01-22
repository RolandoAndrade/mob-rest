import {Module} from "@nestjs/common";
import {SharedModule} from "../../shared/infrastructure/shared.module";
import {RestoreService} from "../application/restore.service";
import {ServerManagerModule} from "../../server-manager/infrastructure/server-manager.module";

@Module({
    imports: [SharedModule, ServerManagerModule],
    providers: [RestoreService],
    exports: [RestoreService]
})

export class RestorationModule{}
