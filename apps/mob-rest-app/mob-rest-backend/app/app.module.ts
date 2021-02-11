import { Module } from '@nestjs/common';
import { SharedModule } from '../src/shared/infrastructure/shared.module';
import { MobModule } from '../src/mob/infrastructure/mob.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from 'path';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '../..', 'public'),
        }),
        SharedModule,
        MobModule],
})
export class AppModule {}
