import { NextFunction, Request, Response } from 'express';
import { logger } from '../utils/logger';

// Define your user info interface
interface UserInfo {
    id: string;
    type: string;
}

// Extend the Request interface to include the userInfo property
declare global {
    namespace Express {
        interface Request {
            userInfo?: UserInfo;
        }
    }
}

export const modifyRequest = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authenticatedUserId = req.get('user-id') || '';
        const authenticatedUserType = req.get('user-type') || '';

        const user = {
            id: authenticatedUserId,
            type: authenticatedUserType,
        };

        req['userInfo'] = user;

        next();
    } catch (error: any) {
        logger.error(`modifyRequest => ${error.message}`);
        res.status(400).send({ message: 'Something went wrong', data: [], success: false });
    }
};
