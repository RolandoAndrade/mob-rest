import { Injectable } from '@nestjs/common';
import {Book} from "../../shared/objects/domain/book";
import {FindQuery} from "../domain/find-query";

@Injectable()
export class MobService {

	async createObject(book: Book){

	}

	async deleteObject(findQuery: FindQuery){}

	async updateObject(findQuery: FindQuery, object: Book){}

	async getObjects(findQuery: FindQuery){}

	async replicateObject(){}

	async restoreObject(){}
}
