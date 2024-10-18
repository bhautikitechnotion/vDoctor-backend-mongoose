import { MongoServerError } from 'mongodb';
import mongoose from 'mongoose';
import { uri } from '../utils';
import { logger } from '../utils/logger';
interface Connection {
    success: boolean;
    message: string;
}
export async function connectToDb(): Promise<Connection> {
    return new Promise(async (resolve, reject) => {
        try {
            await mongoose.connect(uri);

            return resolve({ success: true, message: `Connected to database successfully` });
        } catch (error: any) {
            logger.error('Error connecting to server', (error as MongoServerError).errInfo);
            return reject({ success: true, message: error.message });
        }
    });
}
