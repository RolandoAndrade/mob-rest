import {
    Controller,
    Post,
    Get,
    Delete,
    Body,
    Res,
    HttpStatus,
    Query,
    Put,
} from '@nestjs/common';
import { MobService } from '../application/mob.service';
import { Book } from '../../shared/objects/domain/book';
import { FindQuery } from '../domain/find-query';
import { LoggerService } from '../../shared/loggers/domain/logger.service';
import {CommitStatus} from "../domain/commit-status";

@Controller('mob')
export class MobController {
    constructor(
        private readonly mobService: MobService,
        private readonly loggerService: LoggerService,
    ) {}

    @Post("restore")
    async restoreObjects() {
        this.loggerService.log('restoreObjects: post request', 'MobController');
        return this.mobService.restoreObjects();
    }

    @Post("replicate")
    async replicateObjects(@Body("commitStatus") commitStatus: CommitStatus) {
        this.loggerService.log('replicateObjects: post request', 'MobController');
        return this.mobService.replicateObjects(commitStatus);
    }

    @Post()
    async createObject(@Body() book: Book) {
        this.loggerService.log('createObject: post request', 'MobController', {
            book,
        });
        return this.mobService.createObject(book);
    }

    @Get()
    async getObjects(@Query() query: FindQuery) {
        this.loggerService.log(
            'getObjects: get request',
            'MobController',
            query,
        );
        return this.mobService.getObjects(query);
    }

    @Delete()
    async deleteObject(@Query() query: FindQuery) {
        this.loggerService.log(
            'deleteObject: delete request',
            'MobController',
            query,
        );
        return this.mobService.deleteObject(query);
    }

    @Put()
    async updateObject(@Query() query: FindQuery, @Body() book: Book) {
        this.loggerService.log(
            'updateObject: put request',
            'MobController',
            query,
        );
        return this.mobService.updateObject(query, book);
    }
}
