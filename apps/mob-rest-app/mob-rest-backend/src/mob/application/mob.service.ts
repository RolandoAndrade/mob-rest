import {Injectable} from '@nestjs/common';
import {Book} from '../../shared/objects/domain/book';
import {FindQuery} from '../domain/find-query';
import {MobRepository} from '../domain/mob.repository';
import {LoggerService} from '../../shared/loggers/domain/logger.service';
import {MOBCoordinatorMessages} from "../../shared/domain/mob-coordinator-messages";
import {CommitStatus} from "../domain/commit-status";
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import {Server, Socket} from "socket.io";

@WebSocketGateway()
@Injectable()
export class MobService {
    @WebSocketServer()
    server: Server;

    private onRequestInProgress = false;
    private requestResult = false;

    constructor(
        private readonly mobRepository: MobRepository,
        private readonly loggerService: LoggerService,
    ) {

    }

    async createObject(book: Book): Promise<boolean> {
        this.loggerService.log('createObject: creating object', 'MobService');
        return this.mobRepository.createObject(book);
    }

    async deleteObject(findQuery: FindQuery): Promise<boolean> {
        this.loggerService.log('deleteObject: deleting object', 'MobService');
        return this.mobRepository.deleteObject(findQuery);
    }

    async updateObject(findQuery: FindQuery, object: Partial<Book>): Promise<boolean> {
        this.loggerService.log('updateObject: updating object', 'MobService');
        return this.mobRepository.updateObject(findQuery, object);
    }

    async getObjects(findQuery: FindQuery): Promise<Book[]> {
        this.loggerService.log('getObjects: getting object', 'MobService');
        return this.mobRepository.findObject(findQuery);
    }

    async replicateObjects(commit: CommitStatus): Promise<boolean> {
        this.loggerService.log('replicateObjects: replicating objects', 'MobService');
        this.server.emit(MOBCoordinatorMessages.REPLICATE_OBJECTS, commit);
        return commit === CommitStatus.COMMIT;
    }

    async restoreObjects(): Promise<boolean> {
        this.loggerService.log('restoreObjects: restoring objects', 'MobService');
        this.server.emit(MOBCoordinatorMessages.RESTORE_OBJECTS);
        return true;
    }
}
