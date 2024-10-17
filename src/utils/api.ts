import axios from 'axios';
import { envSettings } from './env.config';

const client = axios.create({
    baseURL: envSettings.backendURL,
    headers: {
        Accept: 'application/json',
    },
});

interface GetRequest {
    url: string;
}

export const getRequest = async (netWorkData: GetRequest) => {
    try {
        const { url } = netWorkData;

        const res: any = await client.get(`${url}`);
        const { data, status } = res;
        if (status === 204) {
            return { response: { success: false, message: 'Something Went Wrong!', data: [] }, error: true };
        }
        return { response: data, error: false };
    } catch (error) {
        return { response: { isLogout: true }, error: true };
    }
};
