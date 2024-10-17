import http from 'http';
import { Server, Socket } from 'socket.io';
import { logger } from '../logger';
import { adminSocket } from './adminSocket';

const mainSocket = async (httpServer: http.Server) => {
    const io = new Server(httpServer, {
        transports: ['websocket', 'polling'],
        pingTimeout: 30000,
        pingInterval: 30000,
        cors: {
            origin: '*',
            allowedHeaders: ['websocket', 'polling'],
        },
    });

    const onAdminSocketConnection = async (socket: Socket) => {
        try {
            await adminSocket(io, socket);

            socket.on('disconnect', () => {
                console.log('admin disconnected', socket.id);
            });
        } catch (error: any) {
            logger.error('onAdminSocketConnection =>', error);
        }
    };

    io.of('/admin').on('connection', onAdminSocketConnection);
};

export { mainSocket };
