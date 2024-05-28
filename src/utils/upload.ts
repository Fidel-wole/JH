import { S3Client, S3ClientConfig } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3_BUCKET_NAME, S3_BUCKET_REGION, S3_BUCKET_SECRET_ACCESS_KEY, S3_BUCKET_ACCESS_KEY_ID } from '../configs/env';

// Define the configuration object
const s3Config: S3ClientConfig = {
  credentials: {
    accessKeyId: S3_BUCKET_ACCESS_KEY_ID || '',
    secretAccessKey: S3_BUCKET_SECRET_ACCESS_KEY || '',
  },
  region: S3_BUCKET_REGION || '',
};

// Create an instance of S3Client with the provided configuration options
const s3 = new S3Client(s3Config);

// Extract bucket name from environment variables
const bucketName: string = S3_BUCKET_NAME || '';

const uploadImages = multer({
  storage: multerS3({
    s3: s3, // Pass the S3Client instance
    bucket: bucketName,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key(req, file, cb) {
      cb(null, `${file.originalname}-${Date.now()}`);
    },
  }),
}).array('images', 10); // Allow up to 10 files with the field name 'images'

export { uploadImages };
