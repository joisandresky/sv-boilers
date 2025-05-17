import { S3Client, GetObjectCommand, PutObjectCommand, ObjectCannedACL } from "@aws-sdk/client-s3";
import {
  AWS_REGION,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  S3_BUCKET_NAME,
  S3_PROVIDER,
} from "$env/static/private";

type S3Provider = 'aws' | 'idcloudhost';

function getS3Endpoint(s3provider: S3Provider): string | undefined {
    if (s3provider === 'aws') {
        return undefined;
    } else {
        return 'https://is3.cloudhost.id';
    }
}

const s3 = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
  endpoint: getS3Endpoint(S3_PROVIDER as S3Provider),
});

function getReturnUrl(s3provider: S3Provider, key: string): string {
  if (s3provider === 'aws') {
    return `https://${S3_BUCKET_NAME}.s3.amazonaws.com/${key}`;
  } else {
    return `https://${AWS_REGION}.cloudhost.id/${S3_BUCKET_NAME}/${key}`;
  }
}

export async function uploadFileToS3(file: File, key: string, acl?: ObjectCannedACL) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const uploadCommand = new PutObjectCommand({
    Bucket: S3_BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: file.type,
    ACL: acl,
  });

  try {
    const response = await s3.send(uploadCommand);
    console.log("S3 upload success ", response);

    return getReturnUrl(S3_PROVIDER as S3Provider, key);
  } catch (error) {
    console.error("S3 upload error ", error);
    return null;
  }
}