import { Injectable } from '@nestjs/common';
import { Book } from '../../shared/objects/domain/book';
import { FindQuery } from '../domain/find-query';
import { MobRepository } from '../domain/mob.repository';
import { LoggerService } from '../../shared/loggers/domain/logger.service';

@Injectable()
export class MobService {
    constructor(
        private readonly mobRepository: MobRepository,
        private readonly loggerService: LoggerService,
    ) {}

    async createObject(book: Book): Promise<boolean> {
        this.loggerService.log('createObject: creating object', 'MobService');
        return this.mobRepository.createObject(book);
    }

    async deleteObject(findQuery: FindQuery) {
        this.loggerService.log('deleteObject: deleting object', 'MobService');
        return this.mobRepository.deleteObject(findQuery);
    }

    async updateObject(findQuery: FindQuery, object: Partial<Book>) {
        this.loggerService.log('updateObject: updating object', 'MobService');
        return this.mobRepository.updateObject(findQuery, object);
    }

    async getObjects(findQuery: FindQuery) {
        this.loggerService.log('getObjects: getting object', 'MobService');
        return this.mobRepository.findObject(findQuery);
    }

    async replicateObject() {}

    async restoreObject() {}
}
