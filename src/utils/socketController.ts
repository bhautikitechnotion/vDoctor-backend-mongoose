import { Socket } from 'socket.io';

export const handleSocketConnection = (socket: Socket) => {
    console.log('A user connected', socket.id);

    socket.on('message', (msg: string) => {
        console.log('Message received: ', msg);
        socket.emit('message', `Server received: ${msg}`);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected', socket.id);
    });
};
