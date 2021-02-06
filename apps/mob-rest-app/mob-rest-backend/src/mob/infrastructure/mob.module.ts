import { Module } from '@nestjs/common';
import { MobController } from './mob.controller';
import { MobService } from '../application/mob.service';
import { MobXmlRepository } from './mob-xml.repository';
import { SharedModule } from '../../shared/infrastructure/shared.module';
import { MobRepository } from '../domain/mob.repository';
import {ConfigManager} from "../../shared/config/domain/config.manager";
@Module({
    imports: [SharedModule],
    controllers: [MobController],
    providers: [
        MobService,
        {
            provide: MobRepository,
            useFactory: (config: ConfigManager)=>{
                return new MobXmlRepository(config)
            },
            inject: [ConfigManager]
        },
    ],
})
export class MobModule {}
