import { Request, Response } from 'express';
import { MongoBulkWriteError } from 'mongodb';
import { logger } from '../../utils/logger';
import { resMsg } from '../../utils/response.messages';
import { uploadToS3 } from '../../utils/upload/s3.config';
import { createNewDegreeModel, createNewSpecialityModel } from './master.model';

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

export const createNewSpeciality = async (req: Request, res: Response): Promise<Response<ReturnResponse>> => {
    try {
        const { body = {}, file } = req;
        const { speciality_name } = body;

        const { success: imageSuccess, data: imageURL } = await uploadToS3(file?.buffer, {
            key: `speciality/${speciality_name}/${Date.now()}.${file?.mimetype.split('/')[1]}`,
            acl_type: 'public-read',
            ContentType: file?.mimetype,
        });

        if (!imageSuccess) {
            return res.status(200).send({ message: resMsg.PROFILE_PICTURE_UPDATE_FAILED, data: [], success: false });
        }
        const [{ Location: image_location }] = imageURL;

        const newBody = {
            speciality_name,
            icon: image_location,
        };

        const { success, data } = await createNewSpecialityModel(newBody);

        if (success) {
            return res.status(200).send({ message: resMsg.NEW_RECORD_ADDED, data: data, success: true });
        }

        return res.status(204).send({ message: resMsg.SOMETHING_WENT_WRONG, data: [], success: false });
    } catch (error: any) {
        if (error instanceof MongoBulkWriteError) {
            let message = resMsg.SOMETHING_WENT_WRONG;

            if (error.code === 11000) {
                message = resMsg.SPECIALITY_ALREADY_AVAILABLE;
            }

            logger.error(`createNewSpeciality => ${error.message}`);
            return res.status(200).send({ message: message, data: [], success: false });
        }

        logger.error(`createNewSpeciality => ${error.message}`);
        return res.status(204).send({ message: resMsg.SOMETHING_WENT_WRONG, data: [], success: false });
    }
};
