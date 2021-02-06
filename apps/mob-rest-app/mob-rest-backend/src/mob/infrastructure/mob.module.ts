import { Module } from '@nestjs/common';
import { MobController } from './mob.controller'
import { MobService } from '../application/mob.service'
import { MobXmlRepository } from './mob-xml.repository'
@Module({
	imports: [],
	controllers: [MobController],
	providers: [MobService,MobXmlRepository],
})
export class MobModule {}
