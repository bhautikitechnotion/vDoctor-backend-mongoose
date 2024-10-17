import twilio from 'twilio';
import { VerificationChannel, VerificationInstance } from 'twilio/lib/rest/verify/v2/service/verification';
import { VerificationCheckInstance } from 'twilio/lib/rest/verify/v2/service/verificationCheck';
import { envSettings } from '../env.config';
import { logger } from '../logger';

const { twilioAccountSid, twilioAuthToken, twilioVerificationSid } = envSettings;

const twilioClient = twilio(twilioAccountSid, twilioAuthToken);

export interface CreateVerification {
    to: string;
    channel?: VerificationChannel;
}

export interface CreateVerificationCheck {
    code: string;
    to: string;
}

export async function createVerification(data: CreateVerification): Promise<VerificationInstance> {
    return new Promise(async (resolve, reject) => {
        try {
            const { to, channel = 'sms' } = data;

            const verification: VerificationInstance = await twilioClient.verify.v2.services(twilioVerificationSid).verifications.create({
                channel: channel,
                to: to,
            });

            return resolve(verification);
        } catch (error: any) {
            logger.error(`createVerification => ${error.message}`);
            return reject(error);
        }
    });
}

export async function createVerificationCheck(data: CreateVerificationCheck): Promise<VerificationCheckInstance> {
    return new Promise(async (resolve, reject) => {
        try {
            const { code, to } = data;

            const verificationCheck: VerificationCheckInstance = await twilioClient.verify.v2
                .services(twilioVerificationSid)
                .verificationChecks.create({
                    code: code,
                    to: to,
                });

            return resolve(verificationCheck);
        } catch (error: any) {
            logger.error(`createVerificationCheck => ${error.message}`);
            return reject(error);
        }
    });
}
