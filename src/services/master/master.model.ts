import { DegreesModal, DegreesSchema } from '../../connections/schemas/m001_degrees';
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
