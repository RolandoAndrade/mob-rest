import { Injectable } from '@nestjs/common';
import { Book } from '../../shared/objects/domain/book';
import { FindQuery } from '../domain/find-query';
import { MobRepository } from '../domain/mob.repository';
import { LoggerService } from '../../shared/loggers/domain/logger.service';
import {MOBCoordinatorMessages} from "../../shared/domain/mob-coordinator-messages";
import {CommitStatus} from "../domain/commit-status";
import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
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

    async waitForResult(): Promise<boolean>{
        this.onRequestInProgress = true;
        return new Promise((resolve)=>{
            const max = 10;
            let tries = 0;
            const check = () => {
                tries++;
                if (tries >= max) {
                    resolve(false);
                    return;
                }
                if (this.onRequestInProgress) setTimeout(check, 250);
                else resolve(this.requestResult);
            };
            check();
        });
    }

    async replicateObjects(commit: CommitStatus): Promise<boolean> {
        this.server.emit(MOBCoordinatorMessages.REPLICATE_OBJECTS, commit);
       return this.waitForResult();
    }

    async restoreObjects(): Promise<boolean> {
        this.server.emit(MOBCoordinatorMessages.RESTORE_OBJECTS);
        return this.waitForResult();
    }

    @SubscribeMessage(MOBCoordinatorMessages.FINISHED)
    onFinishedReceived(client: Socket, data: boolean){
        this.requestResult = data == true;
        this.onRequestInProgress = false;
    }
}
