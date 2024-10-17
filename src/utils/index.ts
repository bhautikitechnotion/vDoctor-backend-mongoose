import bcrypt from 'bcrypt';
import jwt, { JwtPayload, Secret, SignOptions, TokenExpiredError, VerifyCallback } from 'jsonwebtoken';
import moment, { Moment } from 'moment';
import { ObjectId } from 'mongodb';
import path from 'path';
import { envSettings } from './env.config';
import { logger } from './logger';

export const isValidObject = (obj: any): boolean => {
    return obj && Object.keys(obj).length > 0;
};

export const isValidArray = (arr: any): boolean => {
    return arr && Array.isArray(arr) && arr.length > 0;
};

export const isValidURL = (url: any): boolean => {
    let pattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$',
        'i',
    ); // fragment locator
    return !!pattern.test(url);
};

export const currentIso = () => new Date().toISOString();

export const uri: any = envSettings.uri;
export const db: any = envSettings.db;
const userTokenSecretKey: Secret | string | undefined = envSettings.userTokenSecretKey;

export const objectId = (id: string | undefined) => new ObjectId(id);

type PasswordValue = string | null | any;
interface Password {
    password?: PasswordValue;
    hashPassword?: PasswordValue;
    success: boolean;
}

export const encryptPassword = (password: string): Password => {
    try {
        const hash = bcrypt.hashSync(password, 10);

        return {
            hashPassword: hash,
            success: true,
        };
    } catch (error: any) {
        logger.error(`encryptPassword => ${error.message}`);
        return {
            hashPassword: null,
            success: false,
        };
    }
};

export const decryptPassword = (password: any, hashPassword: string): Password => {
    try {
        const validPass = bcrypt.compareSync(password, hashPassword);

        return {
            success: validPass,
        };
    } catch (error: any) {
        logger.error(`decryptPassword => ${error.message}`);
        return {
            success: false,
        };
    }
};

type TokenValue = string | null | any;

interface Token {
    token?: TokenValue;
    hashToken?: TokenValue;
    success: boolean;
    decodeToken?: TokenValue;
    isExpiredToken?: boolean;
}

export const encryptToken = (token: string, expires: string | number = '1d'): Token => {
    try {
        const hash = jwt.sign({ token }, userTokenSecretKey as Secret, { expiresIn: expires, issuer: 'vDoctor' } as SignOptions);
        return {
            hashToken: hash,
            success: true,
        };
    } catch (error: any) {
        logger.error(`encryptToken => ${error.message}`);
        return {
            hashToken: null,
            success: false,
        };
    }
};

export const decryptToken = async (hashToken: string, options: { userId: string }): Promise<Token> => {
    try {
        const decode = jwt.verify(hashToken, userTokenSecretKey as Secret) as VerifyCallback<JwtPayload>;
        return {
            decodeToken: decode,
            success: true,
            isExpiredToken: false,
        };
    } catch (error) {
        const { message } = error as TokenExpiredError;

        let isExpiredToken: boolean | undefined = true;

        logger.error(`decryptToken => ${message}`);
        return {
            token: null,
            success: false,
            isExpiredToken,
        };
    }
};

export const isValidMongoId = (id: string) => {
    const checkMongoId = /^[0-9a-fA-F]{24}$/;
    return checkMongoId.test(id);
};

interface TimeSlots {
    startTime: string;
    endTime: string;
    slotDuration: number;
    bufferTime: number;
}
export const generateTimeSLots = (interval: TimeSlots) => {
    const { startTime, endTime, slotDuration, bufferTime } = interval;

    const start = moment(startTime, 'YYYY-MM-DDTHH:mm:ss.sssZ');
    const end = moment(startTime, 'YYYY-MM-DDTHH:mm:ss.sssZ');
    const timeSlots = [];

    let currentTime = start.clone();

    while (currentTime.isSame(end, 'day')) {
        const slotEndTime = currentTime.clone().add(slotDuration, 'minutes');
        const slotTimeString = `${currentTime.format('hh:mm A')}-${slotEndTime.format('hh:mm A')}`;

        // if (slotEndTime.isAfter(end)) {
        //     break;
        // }

        timeSlots.push(slotTimeString);

        // Move to the next slot start time (including the gap)
        currentTime.add(slotDuration, 'minutes');
        currentTime.add(bufferTime, 'minutes');
    }

    return timeSlots;
};

export const capitalizeString = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const checkIfDateIsInPast = (date: Moment): boolean => {
    if (date.isSameOrAfter(moment(), 'day')) return false;

    return true;
};

export const generateTimeStampFromMongoId = (mongoId: ObjectId): number => {
    const timeStamp: number = mongoId.getTimestamp().getTime();
    const randomNumber = Math.floor(10000 + Math.random() * 90000);

    return timeStamp + randomNumber;
};

export const srcPath = path.join(__dirname, '..');

export const bucketPath = path.join(srcPath, '../bucket');

export const invoicesPath = path.join(bucketPath, '/invoices');

export const removeFalsy = (obj: any) => Object.fromEntries(Object.entries(obj).filter(([_, v]) => v));
