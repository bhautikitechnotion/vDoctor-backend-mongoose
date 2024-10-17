import { NextFunction, Request, Response } from 'express';
import { isValidMongoId } from '../utils';
import { resMsg } from '../utils/response.messages';

interface ReturnResponse {
    message: string;
    data: any[];
    success: boolean;
}

export const isValidUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { params = {} } = req;
        const { doctorId, patientId } = params;

        if (doctorId && patientId) {
            if (!isValidMongoId(doctorId) || !isValidMongoId(patientId)) {
                return res.status(200).send({ message: resMsg.INVALID_USER_ID, data: [], success: false });
            }
            return next();
        }

        if (doctorId) {
            if (!isValidMongoId(doctorId)) {
                return res.status(200).send({ message: resMsg.INVALID_USER_ID, data: [], success: false });
            }
            return next();
        }

        if (patientId) {
            if (!isValidMongoId(patientId)) {
                return res.status(200).send({ message: resMsg.INVALID_USER_ID, data: [], success: false });
            }
            return next();
        }

        return next();
    } catch (error) {
        return res.status(204).send({ message: resMsg.SOMETHING_WENT_WRONG, data: [], success: false });
    }
};
