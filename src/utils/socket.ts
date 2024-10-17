import { Server as HttpServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

class SocketServer {
    private static instance: SocketIOServer;

    private constructor() {}

    public static init(httpServer: HttpServer): SocketIOServer {
        if (!SocketServer.instance) {
            SocketServer.instance = new SocketIOServer(httpServer, {
                cors: {
                    origin: ['http://localhost:3000', 'http://localhost:3001'],
                    methods: ['GET', 'POST'],
                },
            });
        }
        return SocketServer.instance;
    }

    public static getInstance(): SocketIOServer {
        if (!SocketServer.instance) {
            throw new Error('SocketServer not initialized. Call init first.');
        }
        return SocketServer.instance;
    }
}
export default SocketServer;
