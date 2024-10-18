import { check } from 'express-validator';
import Joi from 'joi';

export const validateCreateNewUserType: any[] = [
    check('type', 'User type is required').isNumeric().trim(),
    check('name', 'Name is required').not().isEmpty().trim(),
];

export const createNewDegreeSchema: any[] = [check('degree_names', 'Degree type is required').isString().trim()];

export const createNewSpecialitySchema = Joi.object({
    speciality_name: Joi.string().trim().required().messages({
        'string.base': 'at least one speciality is required',
        'string.empty': 'at least one speciality is required',
        'any.required': 'at least one speciality is required',
    }),
});
