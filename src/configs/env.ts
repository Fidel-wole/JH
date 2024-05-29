/* eslint-disable prettier/prettier */
import { config } from 'dotenv';
config();
export const {
  MONGODB_USER,
  MONGODB_PASSWORD,
  MONGODB_DB,
  JWT_SECRET,
  S3_BUCKET_NAME,
  S3_BUCKET_REGION,
  S3_BUCKET_ACCESS_KEY_ID,
  S3_BUCKET_SECRET_ACCESS_KEY,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTHTOKEN,
  TWILIO_SERVICES_ID,
  TWILIO_PHONE_NUMBER,
  PORT
} = process.env;
