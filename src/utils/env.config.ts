import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

export interface ENVConfig {
    serverPort: string | undefined;
    uri: string | undefined;
    db: string | undefined;
    userTokenSecretKey: string | undefined;
    accessTokenMaxAge: string | undefined;
    refreshTokenMaxAge: string | undefined;
    smtpUser: string | undefined;
    smtpPassword: string | undefined;
    awsS3SecretKeyId: any;
    awsS3AccessKey: any;
    awsS3BucketName: any;
    awsS3BucketRegion: string | undefined;
    stripePublishableKey: any;
    stripeSecretKey: any;
    paymentSuccessURL: string | undefined;
    paymentFailureURL: string | undefined;
    webhookEndPointSecret: any;
    backendURL: string | undefined;
    video_conference: string | undefined;
    paypalBaseUrl: string | undefined;
    paypalClientId: string | undefined;
    paypalSecretId: string | undefined;
    platFormServiceCharge: string | undefined;
    frontEndUserAppUrl: string | undefined;
    twilioAccountSid: string;
    twilioAuthToken: string;
    twilioPhoneNumber: string;
    twilioVerificationSid: string;
}

const envSettings: ENVConfig = {
    serverPort: process.env.SERVER_PORT,
    uri: process.env.MONGO_CONNECTION_URL,
    db: process.env.MONGO_DB,
    userTokenSecretKey: process.env.USER_TOKEN_SECRET_KEY,
    accessTokenMaxAge: process.env.ACCESS_TOKEN_MAX_AGE,
    refreshTokenMaxAge: process.env.REFRESH_TOKEN_MAX_AGE,
    smtpUser: process.env.EMAIL_FROM,
    smtpPassword: process.env.EMAIL_PASSWORD,
    awsS3SecretKeyId: process.env.AWS_S3_SECRET_KEY,
    awsS3AccessKey: process.env.AWS_S3_ACCESS_KEY,
    awsS3BucketName: process.env.AWS_S3_BUCKET,
    awsS3BucketRegion: process.env.AWS_S3_REGION,
    stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    paymentSuccessURL: process.env.PAYMENT_SUCCESS_URL,
    paymentFailureURL: process.env.PAYMENT_FAILURE_URL,
    webhookEndPointSecret: process.env.WEBHOOK_END_POINT_SECRET,
    backendURL: process.env.BACK_END_URL,
    video_conference: process.env.FRONT_END_VIDEO_CONFERENCE_LINK,
    paypalBaseUrl: process.env.PAYPAL_BASE_URL,
    paypalClientId: process.env.PAYPAL_CLIENT_ID,
    paypalSecretId: process.env.PAYPAL_SECRET_ID,
    platFormServiceCharge: process.env.PLATFORM_SERVICE_CHARGE,
    frontEndUserAppUrl: process.env.USER_APP_URL,
    twilioAccountSid: process.env.TWILIO_ACCOUNT_SID || '',
    twilioAuthToken: process.env.TWILIO_AUTH_TOKEN || '',
    twilioPhoneNumber: process.env.TWILIO_PHONE_NUMBER || '',
    twilioVerificationSid: process.env.TWILIO_VERIFICATION_SERVICE_ID || '',
};

export { envSettings };
