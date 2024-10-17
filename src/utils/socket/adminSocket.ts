import EventEmitter from 'events';
import { Socket } from 'socket.io';
import { fetchAdminNotifications } from '../../services/admin/common/common.model';
import { logger } from '../logger';

export const socketEmitter = new EventEmitter();

const adminSocket = async (io: any, socket: Socket) => {
    return new Promise(async () => {
        try {
            const getAdminNotifications = async () => {
                const { success, data } = await fetchAdminNotifications();

                socket.emit('notifications', { success, data });
            };

            socket.on('notifications', getAdminNotifications);

            socketEmitter.on('notifications_event', getAdminNotifications);
        } catch (error: any) {
            logger.error('adminSocket =>', error);
        }
    });
};

export { adminSocket };
