import { S3Client } from '@aws-sdk/client-s3';
import AWS from 'aws-sdk';
import Bluebird from 'bluebird';
import { isValidObject } from '../../utils';
import { envSettings } from '../../utils/env.config';
import { logger } from '../../utils/logger';

export const { awsS3BucketName, awsS3BucketRegion, awsS3AccessKey, awsS3SecretKeyId } = envSettings;

AWS.config.setPromisesDependency(Bluebird);

AWS.config.update({ accessKeyId: awsS3AccessKey, region: awsS3BucketRegion, secretAccessKey: awsS3SecretKeyId });

export const s3 = new AWS.S3();

interface UploadOptions {
    bucketName?: string;
    key: string;
    acl_type?: 'private' | 'public-read';
    ContentType: string | undefined;
}
interface UploadObjectResponse {
    success: boolean;
    data: any[];
}
export const uploadToS3 = (body: any, options: UploadOptions): Promise<UploadObjectResponse> => {
    return new Promise(async (resolve, reject) => {
        try {
            const uploadOptions = {
                Bucket: options.bucketName || awsS3BucketName,
                Key: options.key,
                Body: body,
                ACL: options.acl_type || 'private',
                ContentType: options.ContentType,
            };

            const objectData = await s3.upload(uploadOptions).promise();

            if (isValidObject(objectData)) {
                return resolve({ success: true, data: [objectData] });
            }

            return resolve({ success: false, data: [] });
        } catch (error: any) {
            logger.error(`uploadToS3 => ${error.message}`);
            return reject(error);
        }
    });
};

export const s3Client = new S3Client({
    region: awsS3BucketRegion,
    credentials: {
        accessKeyId: awsS3AccessKey,
        secretAccessKey: awsS3SecretKeyId,
    },
});
