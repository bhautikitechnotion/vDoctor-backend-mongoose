import { check } from 'express-validator';

export const validateCreateNewUserType: any[] = [
    check('type', 'User type is required').isNumeric().trim(),
    check('name', 'Name is required').not().isEmpty().trim(),
];

export const createNewDegreeSchema: any[] = [check('degree_names', 'Degree type is required').isString().trim()];

export const createNewSpecialitySchema: any[] = [check('speciality_names', 'at least one speciality is required ').isString().trim()];
