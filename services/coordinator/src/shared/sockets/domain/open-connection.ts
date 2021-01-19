import {Logger} from "@nestjs/common";
import {Socket} from "socket.io-client";


export async function openConnection(port: number, host: string): Promise<Socket> {
    const logger = new Logger("openConnection");
    logger.log(`Iniciando conexión con ${host}:${port}`);

    const socket = new Socket();

    socket.on("error", () => {
        logger.error(`Fallo al conectar con ${host}:${port}`);
        logger.log(`Reintentando...`);
        socket.connect(port, host, () => {
            logger.log(`Conectado con ${host}:${port}`);
        });
    });

    socket.on("connect", () => {
        logger.log(`Conectado con ${host}:${port}`);
    });

    socket.on("close", () => {
        logger.log(`Desconectado`);
        socket.connect(port, host, () => {
            logger.log(`Conectado con ${host}:${port}`);
        });
    });

    return new Promise((resolve, reject) => {
        socket.connect(port, host, () => {
            return resolve(socket);
        });
    });
}
