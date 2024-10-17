import express from 'express';
import { validate } from '../../middleware/bodyValidation';
import { createNewDegree } from './master.controller';
import { createNewDegreeSchema } from './master.validation';

const mastersRouter = express.Router();

//! POST request
mastersRouter.post('/add_new_degree', validate(createNewDegreeSchema), createNewDegree);

//! GET request

//! PATCH request

//! DELETE request

export default mastersRouter;
