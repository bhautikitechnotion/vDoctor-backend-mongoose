import nodemailer, { SendMailOptions } from 'nodemailer';
import { isValidArray, isValidObject } from '..';
import { envSettings } from '../env.config';

export interface EmailBody {
    message?: string;
    to?: string;
    text?: string;
    messageAsHtml?: string;
    subject?: string;
    attachments?: any[];
}

interface EmailReturnBody {
    success: boolean;
}

export const sendMail = async (body: EmailBody): Promise<EmailReturnBody> => {
    const transporter = nodemailer.createTransport({
        name: 'smtp.gmail.com',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: envSettings.smtpUser,
            pass: envSettings.smtpPassword,
        },
    });
    const { subject, message, messageAsHtml, to, attachments } = body;

    const messageBody: SendMailOptions = {
        to: to,
        subject: subject,
        text: message,
        html: messageAsHtml,
        attachments: attachments,
    };
    const mailRes = await transporter.sendMail(messageBody);

    if (isValidObject(mailRes)) {
        const { accepted, rejected } = mailRes;

        if (isValidArray(rejected)) {
            return { success: false };
        }

        if (isValidArray(accepted)) {
            return { success: true };
        }
    }
    return { success: false };
};
