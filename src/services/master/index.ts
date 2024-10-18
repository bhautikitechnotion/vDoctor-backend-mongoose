import express from 'express';
import multer from 'multer';
import { validate } from '../../middleware/bodyValidation';
import { multerErrorHandler } from '../../middleware/multerFileSize';
import { createNewDegree, createNewSpeciality, createNewUserType } from './master.controller';
import { createNewDegreeSchema, validateCreateNewUserType } from './master.validation';

const mastersRouter = express.Router();

const upload = multer({
    limits: {
        fileSize: 1 * 1024 * 1024, // 1 MB
    },
});

//! POST request
mastersRouter.post('/new_user_type', validate(validateCreateNewUserType), createNewUserType);
mastersRouter.post('/add_new_degree', validate(createNewDegreeSchema), createNewDegree);
mastersRouter.post('/add_new_speciality', upload.single('img'), multerErrorHandler(), createNewSpeciality);

//! GET request

//! PATCH request

//! DELETE request

export default mastersRouter;
