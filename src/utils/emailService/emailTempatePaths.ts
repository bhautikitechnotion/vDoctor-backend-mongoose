import fs from 'fs';
import path from 'path';

// const appointmentConformationPath = path.join(__dirname, '../email-templates/appointmentConformation.ejs');
const appointmentConformationPath = path.join(__dirname, '../../email-templates/appointmentConformation.ejs');
export const appointmentConformation = fs.readFileSync(appointmentConformationPath, 'utf-8');

const doctorAppointmentNotificationPath = path.join(__dirname, '../../email-templates/doctorAppointmentNotification.ejs');
export const doctorAppointmentNotification = fs.readFileSync(doctorAppointmentNotificationPath, 'utf-8');

const PaymentConformationPath = path.join(__dirname, '../../email-templates/paymentSuccessEmail.ejs');
export const PaymentConformationNotification = fs.readFileSync(PaymentConformationPath, 'utf-8');

export const patientInvoicesPath = path.join(__dirname, '../../email-templates/patientInvoice.ejs');
export const patientInvoicesNotification = fs.readFileSync(patientInvoicesPath, 'utf-8');

export const testPathPath = path.join(__dirname, '../../email-templates/testTemplate.ejs');
export const testPathNotification = fs.readFileSync(testPathPath, 'utf-8');

const emailTemplatePath = path.join(__dirname, '../../email-templates/email_template.ejs');
export const emailTemplate = fs.readFileSync(emailTemplatePath, 'utf-8');

const resetPasswordTemplatePath = path.join(__dirname, '../../email-templates/reset_password.ejs');
export const resetPasswordTemplate = fs.readFileSync(resetPasswordTemplatePath, 'utf-8');

const doctorRegisterTemplatePath = path.join(__dirname, '../../email-templates/doctor_register_template.ejs');
export const doctorRegisterTemplate = fs.readFileSync(doctorRegisterTemplatePath, 'utf-8');

const newDoctorRegisterTemplatePath = path.join(__dirname, '../../email-templates/new_doctor_registred.ejs');
export const newDoctorRegisterTemplate = fs.readFileSync(newDoctorRegisterTemplatePath, 'utf-8');

const accountVerificationTemplatePath = path.join(__dirname, '../../email-templates/account_verification_template.ejs');
export const accountVerificationTemplate = fs.readFileSync(accountVerificationTemplatePath, 'utf-8');

const doctorProfileApprovedTemplatePath = path.join(__dirname, '../../email-templates/doctor_profile_approve_template.ejs');
export const doctorProfileApprovedTemplate = fs.readFileSync(doctorProfileApprovedTemplatePath, 'utf-8');

const doctorProfileRejectedTemplatePath = path.join(__dirname, '../../email-templates/doctor_profile_reject_template.ejs');
export const doctorProfileRejectedTemplate = fs.readFileSync(doctorProfileRejectedTemplatePath, 'utf-8');
