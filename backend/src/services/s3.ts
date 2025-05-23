import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { config } from 'dotenv';

config();

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const uploadToS3 = async (file: Express.Multer.File, userId: string) => {
  const key = `${userId}/${Date.now()}-${file.originalname}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  await s3Client.send(command);

  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
};

export const deleteFromS3 = async (url: string) => {
  const key = url.split('.amazonaws.com/')[1];

  const command = new DeleteObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: key,
  });

  await s3Client.send(command);
}; 