import {Controller, Post, Get, Delete, Body, Res, HttpStatus, Query, Put} from '@nestjs/common';
import { MobService } from '../application/mob.service'
import { MobXmlRepository } from './mob-xml.repository'
import { Response } from 'express';
import {Book} from "../../shared/objects/domain/book";
import {FindQuery} from "../domain/find-query";

@Controller("mob")
export class MobController {
	constructor(
		private readonly mobService:MobService
	){}

	@Post()
	async createObject(@Body() book: Book) {
		return this.mobService.createObject(book);
	}

	@Get()
	async getObject(@Query() query: FindQuery) {
		return this.mobService.getObjects(query);
	}

	@Delete()
	async deleteObject(@Query() query: FindQuery) {
		return this.mobService.deleteObject(query);
	}

	@Put()
	async updateObject(@Query() query: FindQuery, @Body() book: Book) {
		return this.mobService.updateObject(query, book);
	}
}
