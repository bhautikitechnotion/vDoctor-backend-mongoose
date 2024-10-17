import { ClientSession, Db, MongoClient } from 'mongodb';
import { db, uri } from '../utils';
import { logger } from '../utils/logger';
import { ConnectToCollections } from './connectToCollections';

const dbClient = new MongoClient(uri);

export const createSession = (): ClientSession => dbClient.startSession();

export const endSession = (session: ClientSession) => {
    if (session) {
        session.endSession();
    }
};

interface Connection {
    success: boolean;
    message: string;
}
export async function connectToDb(): Promise<Connection> {
    return new Promise(async (resolve, reject) => {
        try {
            await dbClient.connect();

            const dataBase: Db = dbClient.db(db);

            await ConnectToCollections(dataBase);
            return resolve({ success: true, message: `Connected to ${dataBase.databaseName} database successfully` });
        } catch (error: any) {
            logger.error(`connectToDb => ${error.message}`);
            return reject({ success: true, message: error.message });
        }
    });
}
