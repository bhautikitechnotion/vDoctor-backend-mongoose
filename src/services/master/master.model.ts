import { DegreesModal, DegreesSchema } from '../../connections/schemas/m001_degrees';
import { SpecialityModal } from '../../connections/schemas/m002_specialties';
import { UserTypesModal } from '../../connections/schemas/m003_user_types';
import { isValidArray } from '../../utils';
import { logger } from '../../utils/logger';

interface ReturnResponse {
    update?: boolean;
    success?: boolean;
    data: any;
}

interface CreateNewDegree {
    degree_name: string;
    is_deleted: boolean;
    createdAt: string;
    updatedAt: string;
}

interface CreateNewUserType {
    name: string;
    type: number;
}

interface CreateNewSpeciality {
    speciality_name: string;
    icon: string;
}

export const createNewDegreeModel = async (body: CreateNewDegree[]): Promise<ReturnResponse> => {
    return new Promise(async (resolve, reject) => {
        try {
            const res: Array<Omit<DegreesSchema, '_id'>> = await DegreesModal.insertMany(body);

            if (isValidArray(res)) {
                return resolve({
                    success: true,
                    data: res,
                });
            }

            return resolve({ success: false, data: [] });
        } catch (error: any) {
            logger.error(`createNewDegreeModel => ${error.message}`);
            return reject({ success: false, data: [] });
        }
    });
};

export const createNewSpecialityModel = async (body: CreateNewSpeciality): Promise<ReturnResponse> => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await SpecialityModal?.insertMany(body);

            if (isValidArray(res)) {
                return resolve({ success: true, data: res });
            }

            return resolve({ success: false, data: [] });
        } catch (error: any) {
            logger.error(`createNewSpecialityModel => ${error.message}`);
            return reject(error);
        }
    });
};

export const createNewUserTypeModel = async (body: CreateNewUserType): Promise<ReturnResponse> => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await UserTypesModal.insertMany(body);

            if (isValidArray(res)) {
                return resolve({ success: true, data: res });
            }

            return resolve({ success: false, data: [] });
        } catch (error: any) {
            logger.error(`createNewUserTypeModel => ${error.message}`);
            return reject(error);
        }
    });
};
