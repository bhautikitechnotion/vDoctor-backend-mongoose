import { NextFunction, Request, Response } from 'express';
import { Schema } from 'joi';

export const validateBody = (schema: Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);

        if (error) {
            // If validation fails, send 400 Bad Request response with error details
            // return res.status(400).json({ error: error.details[0].message });
            return res.status(400).send({ message: error.details[0].message, success: false, data: [] });
        }
        // If validation passes, proceed to the next middleware/route handler
        next();
    };
};
