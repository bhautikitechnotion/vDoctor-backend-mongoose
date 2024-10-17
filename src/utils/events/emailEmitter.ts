import ejs from 'ejs';
import EventEmitter from 'events';
import moment from 'moment';
import { getAdminDetailsModel } from '../../services/doctors/models/doctor.model';
import {
    doctorProfileApprovedTemplate,
    doctorProfileRejectedTemplate,
    doctorRegisterTemplate,
    newDoctorRegisterTemplate,
} from '../emailService/emailTempatePaths';
import { envSettings } from '../env.config';
import { logger } from '../logger';
import { sendMail } from '../sendEmail';

const emailEventEmitter = new EventEmitter();

emailEventEmitter.on('new_doctor_registered', async ({ email }) => {
    try {
        const adminEmailData = {
            email,
            registration_date: moment().format('DD-MM-YYYY'),
        };

        const adminEmailTemplate = ejs.render(newDoctorRegisterTemplate, adminEmailData);

        const { data: adminEmail } = await getAdminDetailsModel();

        const adminMailBody = {
            to: adminEmail,
            subject: `New doctor registred`,
            messageAsHtml: adminEmailTemplate,
        };
        sendMail(adminMailBody);
    } catch (error: any) {
        logger.error(`emailEventEmitter: new_doctor_registered => ${error.message}`);
    }
});

emailEventEmitter.on('welcome_doctor', async ({ email, hashToken }) => {
    try {
        const doctorEmailData = {
            user_email: email,
            link: `${envSettings.frontEndUserAppUrl}/verify-user?token=${hashToken}`,
        };

        const doctorEmailTemplate = ejs.render(doctorRegisterTemplate, doctorEmailData);

        const mailBody = {
            to: email,
            subject: 'Registration Success',
            messageAsHtml: doctorEmailTemplate,
        };
        sendMail(mailBody);
    } catch (error: any) {
        logger.error(`emailEventEmitter: welcome_doctor => ${error.message}`);
    }
});

emailEventEmitter.on('doctor_profile_approved', ({ email }) => {
    const templateBody = {
        loginURL: envSettings.frontEndUserAppUrl,
    };

    const template = ejs.render(doctorProfileApprovedTemplate, templateBody);

    const mailBody = {
        to: email,
        subject: 'Your profile has been approved',
        messageAsHtml: template,
    };
    sendMail(mailBody);
});

emailEventEmitter.on('doctor_profile_rejected', ({ email }) => {
    const templateBody = {
        loginURL: envSettings.frontEndUserAppUrl,
    };

    const template = ejs.render(doctorProfileRejectedTemplate, templateBody);

    const mailBody = {
        to: email,
        subject: 'Your profile has been rejected',
        messageAsHtml: template,
    };
    sendMail(mailBody);
});

export { emailEventEmitter };
