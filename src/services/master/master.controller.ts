import { Request, Response } from 'express';
import { logger } from '../../utils/logger';
import { resMsg } from '../../utils/response.messages';
import { createNewDegreeModel } from './master.model';

interface ReturnResponse {
    message: string;
    data: any[];
    success: boolean;
}

export const createNewDegree = async (req: Request, res: Response): Promise<Response<ReturnResponse>> => {
    try {
        const { body = {} } = req;
        const { degree_names } = body;

        const newBody = degree_names.split(',').map((degree: string) => {
            return {
                degree_name: degree.toLowerCase().trim(),
            };
        });

        const { success, data } = await createNewDegreeModel(newBody);

        if (success) {
            return res.status(200).send({ message: resMsg.NEW_RECORD_ADDED, data: data, success: true });
        }

        return res.status(204).send({ message: resMsg.SOMETHING_WENT_WRONG, data: [], success: false });
    } catch (error: any) {
        logger.error(`createNewDegree => ${error.message}`);
        return res.status(204).send({ message: resMsg.SOMETHING_WENT_WRONG, data: [], success: false });
    }
};
