import {Logger} from "@nestjs/common";
import {Socket} from "socket.io-client"

export async function openConnection(port: number, host: string): Promise<Socket> {
    const logger = new Logger("openConnection");
    logger.log(`openConnection: starting connection ${host}:${port}`);

    const socket = require('socket.io-client')(`ws://${host}:${port}`);

    socket.on('event', function(data){
        logger.log(`event ${data}`);
    });
    socket.on('disconnect', function(){
        logger.log(`disconnected`);
    });

    socket.on("error", () => {
        logger.error(`failed connection ${host}:${port}`);
        logger.log(`retrying...`);
    });

    return new Promise((resolve => {
        socket.on('connect', function(){
            logger.log("openConnection: connected")
            resolve(socket);
        });
    }))
}
