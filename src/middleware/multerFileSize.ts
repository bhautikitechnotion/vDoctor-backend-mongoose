import { NextFunction, Request, Response } from 'express';
import multer from 'multer';

export const multerErrorHandler = () => {
    return (err: any, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof multer.MulterError) {
            // Handle file size limit error
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(200).json({
                    message: 'File is too large. Maximum size allowed is 1MB.',
                });
            }
            // Handle other Multer errors
            return res.status(200).json({
                message: err.message,
            });
        } else if (err) {
            // Handle unknown errors
            return res.status(500).json({
                message: 'An error occurred during file upload.',
            });
        }
        // If no error, pass control to the next middleware
        next();
    };
};
