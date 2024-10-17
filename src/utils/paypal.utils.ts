import axios, { AxiosResponse } from 'axios';
import { isValidObject } from '.';
import { envSettings } from './env.config';
import { PaymentSessionData } from './interfaceUtilities';
import { logger } from './logger';

const { paypalBaseUrl, paypalClientId, paypalSecretId } = envSettings;

/**
 * Generate an OAuth 2.0 access token for authenticating with PayPal REST APIs.
 * @see https://developer.paypal.com/api/rest/authentication/
 */
const generateAccessToken = async () => {
    try {
        if (!paypalClientId || !paypalSecretId) {
            throw new Error('MISSING_API_CREDENTIALS');
        }

        const url = `${paypalBaseUrl}/v1/oauth2/token`;

        const auth = Buffer.from(paypalClientId + ':' + paypalSecretId).toString('base64');

        const response: AxiosResponse = await axios.post(url, `grant_type=client_credentials`, {
            headers: { Authorization: `Basic ${auth}` },
        });

        return response.data.access_token;
    } catch (error) {
        console.error('Failed to generate Access Token:', error);
    }
};

/**
 * Create an order to start the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_create
 */
export const createOrder = async (cart: PaymentSessionData) => {
    try {
        // use the cart information passed from the front-end to calculate the purchase unit details
        // console.log('shopping cart information passed from the frontend createOrder() callback:', cart);

        const { appointmentId, doctorFees, appointmentMode, appointmentType, doctor_id, patient_id, unique_id } = cart;

        const accessToken = await generateAccessToken();

        const url = `${paypalBaseUrl}/v2/checkout/orders`;

        const payload = {
            intent: 'CAPTURE',
            purchase_units: [
                {
                    reference_id: appointmentId,
                    amount: {
                        currency_code: 'USD',
                        value: doctorFees,
                    },
                    unique_id,
                    metadata: {
                        appointmentId,
                        doctorFees,
                        patient_id,
                        doctor_id,
                        appointmentMode,
                        appointmentType,
                    },
                },
            ],
            // payment_source: {
            //     paypal: {
            //         experience_context: {
            //             payment_method_preference: 'IMMEDIATE_PAYMENT_REQUIRED',
            //             brand_name: 'vDoctor',
            //             shipping_preference: 'NO_SHIPPING',
            //             user_action: 'PAY_NOW',
            //         },
            //     },
            // },
        };

        const response: AxiosResponse = await axios.post(url, JSON.stringify(payload), {
            headers: {
                'Content-Type': 'application/json',
                // 'PayPal-Request-Id': uuidv4(),
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return Promise.resolve(handleResponse(response));
    } catch (error: any) {
        logger.error(`createOrder => ${error.message}`);
        return Promise.reject(error.message);
    }
};

/**
 * Capture payment for the created order to complete the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
 */
export const captureOrder = async (orderID: any) => {
    try {
        const accessToken = await generateAccessToken();
        const url = `${paypalBaseUrl}/v2/checkout/orders/${orderID}/capture`;

        const response: AxiosResponse = await axios.post(
            url,
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        );

        return Promise.resolve(handleResponse(response));
    } catch (error: any) {
        logger.error(`captureOrder => ${error.message}`);
        return Promise.resolve(handleResponse(error));
    }
};

export const refundPaymentFromPaypal = async (orderID: any) => {
    try {
        const accessToken = await generateAccessToken();

        const url = `${paypalBaseUrl}/v2/payments/captures/${orderID}/refund`;

        const response: AxiosResponse = await axios.post(url, JSON.stringify({}), {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return Promise.resolve(handleResponse(response));
    } catch (error: any) {
        logger.error(`refundPaymentFromPaypal => ${error.message}`);
        return Promise.resolve(handleResponse(error));
    }
};

const handleResponse = async (response: any) => {
    try {
        if (response.response) {
            // if error from API response
            const { data, status } = response.response;
            return {
                jsonResponse: data,
                httpStatusCode: status,
            };
        } else if (isValidObject(response)) {
            // Valid response
            const { data, status } = response;
            return {
                jsonResponse: data,
                httpStatusCode: status,
            };
        } else {
            return {
                jsonResponse: [],
                httpStatusCode: 500,
            };
        }
    } catch (err: any) {
        logger.error(`handleResponse => ${err.message}`);
        throw new Error(err.message);
    }
};
