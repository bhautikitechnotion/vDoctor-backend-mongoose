import Stripe from 'stripe';
import { isValidObject } from '.';
import { envSettings } from './env.config';
import { PaymentSessionData, RefundPayment, RefundPaymentBody } from './interfaceUtilities';
import { logger } from './logger';

export const stripe = new Stripe(envSettings.stripeSecretKey);

export const createStripeSession = async (sessionData: PaymentSessionData) => {
    try {
        const { doctorFees, patient_id, doctor_id, appointmentMode, appointmentType, appointmentId, unique_id } = sessionData;
        const session: Stripe.Checkout.Session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'vDoctor',
                        },
                        unit_amount: doctorFees * 100, // The amount in the smallest currency unit (e.g., cents)
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${envSettings.paymentSuccessURL}?pId=${patient_id}&aId=${appointmentId}&type=upcoming`,
            cancel_url: `${envSettings.paymentFailureURL}?pId=${patient_id}&aId=${appointmentId}&type=upcoming`,
            billing_address_collection: 'auto',
            shipping_address_collection: {
                allowed_countries: ['US'],
            },
            phone_number_collection: {
                enabled: true,
            },
            invoice_creation: { enabled: true },
            metadata: {
                appointmentId,
                unique_id,
                doctorFees,
                patient_id,
                doctor_id,
                appointmentMode,
                appointmentType,
            },
        });

        return Promise.resolve({ success: true, data: session });
    } catch (error: any) {
        logger.error(`createStripeSession => ${error.message}`);
        return Promise.reject(error.message);
    }
};

export const refundPaymentFromStripe = async (sessionData: RefundPaymentBody): Promise<RefundPayment> => {
    return new Promise(async (resolve, reject) => {
        try {
            const { appointmentId, patient_id, sessionId } = sessionData;

            const refund = await stripe.refunds.create({
                payment_intent: sessionId,
                metadata: { appointmentId, patient_id },
            });

            if (isValidObject(refund)) {
                return resolve({ success: true, data: refund });
            }

            return resolve({ success: false, data: [] });
        } catch (error: any) {
            logger.error(`refundPaymentFromStripe => ${error.message}`);
            return resolve({ success: false, data: [] });
        }
    });
};
