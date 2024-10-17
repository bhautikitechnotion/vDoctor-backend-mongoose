import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const validate = (schema: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        await Promise.all(schema.map((rule: any) => rule.run(req)));

        const errors = validationResult(req);

        if (errors.isEmpty()) {
            return next();
        }

        res.status(400).send({ message: errors.array(), data: [], success: false });
    };
};
