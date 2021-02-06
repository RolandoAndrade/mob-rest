import { Controller, Post, Get, Delete, Body, Res,HttpStatus } from '@nestjs/common';
import { MobService } from '../application/mob.service'
import { MobXmlRepository } from './mob-xml.repository'
import { Response } from 'express';

@Controller('object-manipulator')
export class MobController {
	constructor(
		private readonly objectManipulatorRepository:MobXmlRepository
	){}

	@Post('')
	async SaveObject(
		@Res() res: Response,
		@Body() body: any
	) {
		try{
			const response = await this.objectManipulatorRepository.createObject(body)
			return res.status(HttpStatus.OK).send(response);
		}catch(e){
			return res.status(HttpStatus.BAD_REQUEST).send(JSON.stringify(e.message));
		}		
	}

	@Post('find')
	async getObject(
		@Res() res: Response,
		@Body() body: any
	) {
		try{
			const response = await this.objectManipulatorRepository.consultObject(body.key)
			return res.status(HttpStatus.OK).send(response);
		}catch(e){
			return res.status(HttpStatus.BAD_REQUEST).send(JSON.stringify(e.message));
		}		
	}

	@Delete('')
	async DeleteObject(
		@Res() res: Response,
		@Body() body: any
	) {
		try{
			const response = await this.objectManipulatorRepository.deleteObject(body.key)
			return res.status(HttpStatus.OK).send(response);
		}catch(e){
			return res.status(HttpStatus.BAD_REQUEST).send(JSON.stringify(e.message));
		}		
	}
}
