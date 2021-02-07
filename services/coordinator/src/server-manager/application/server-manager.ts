import { ConfigManager } from '../../shared/config/domain/config.manager';
import { Injectable } from '@nestjs/common';
import { openConnection } from '../../shared/sockets/domain/open-connection';
import { Host } from '../../shared/config/domain/host';
import { LoggerService } from '../../shared/loggers/domain/logger.service';
import { Socket } from 'socket.io';

@Injectable()
export class ServerManager {
    private static servers: Socket[] = [];
    constructor(
        private readonly configManager: ConfigManager,
        private readonly loggerService: LoggerService,
    ) {}

    public async fillServers() {
        if (ServerManager.servers.length === 0) {
            this.loggerService.log(
                'fillServers: starting connection with servers',
                'ServerManager',
            );
            const servers: Host[] = this.configManager.get(
                'appServers',
            );
            for (const server of servers) {
                ServerManager.servers.push(
                    await openConnection(server.port, server.address),
                );
            }
        }
    }

    public sendMessageToServers(message: string, data?: any) {
        this.loggerService.log(
            'sendMessageToServers: sending message to servers',
            'ServerManager',
            { message },
        );
        for (const server of ServerManager.servers) {
            server.emit(message, data);
        }
    }

    public addEventFromServer(event: string, fn: Function) {
        for (const server of ServerManager.servers) {
            server.on(event, (data) => {
                fn(data);
            });
        }
    }
}
