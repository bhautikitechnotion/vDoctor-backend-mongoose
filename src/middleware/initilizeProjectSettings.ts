import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import { bucketPath } from '../utils';
import { logger } from '../utils/logger';

export const initializeProjectSettings = (req: Request, res: Response, next: NextFunction) => {
    try {
        //! Create a invoices folder
        // fs.mkdir(invoicesPath, { recursive: true }, (err) => {
        //     if (err) {
        //         throw new Error('Failed to create invoices folder');
        //     }
        // });

        //! Create a bucket folder
        fs.mkdir(bucketPath, { recursive: true }, (err) => {
            if (err) {
                throw new Error('Failed to create bucket folder');
            }
        });

        //! Create a invoices folder
        fs.mkdir(`${bucketPath}/invoices`, { recursive: true }, (err) => {
            if (err) {
                throw new Error('Failed to create invoices folder');
            }
        });

        next();
    } catch (error: any) {
        logger.error(`initializeProjectSettings => ${error.message}`);
        res.status(200).send({ message: 'Failed to initialize project settings', data: [], success: false });
        process.exit(1);
    }
};
