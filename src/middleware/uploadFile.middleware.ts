import { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import { resMsg } from '../utils/response.messages';

const upload = multer({ dest: '../uploads/' });

export const uploadFiles = (req: Request, res: Response, next: NextFunction) => {
    upload.array('file')(req, res, (error) => {
        if (error) {
            return res.status(200).send({ message: resMsg.FILE_UPLOAD_FAILED, data: [], success: false });
        }
        return next();
    });
};
