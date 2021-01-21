import {Logger} from "@nestjs/common";
import io from "socket.io-client";
import {Socket as SIO} from "socket.io-client"
import {Socket} from "net";

export async function openConnection(port: number, host: string): Promise<SIO> {
    const logger = new Logger("openConnection");
    logger.log(`openConnection: starting connection ${host}:${port}`);

    const socket = io(`ws://${host}:${port}`);

    socket.on("error", () => {
        logger.error(`failed connection ${host}:${port}`);
        logger.log(`retrying...`);
    });

    socket.on("close", () => {
        logger.log(`disconnected`);
    });

    return socket;
}
