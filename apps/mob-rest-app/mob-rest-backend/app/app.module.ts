import { Module } from '@nestjs/common';
import { SharedModule } from '../src/shared/infrastructure/shared.module';
import { MobModule } from '../src/mob/infrastructure/mob.module';

@Module({
    imports: [SharedModule, MobModule],
})
export class AppModule {}
