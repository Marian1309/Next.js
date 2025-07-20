'use server';

import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { isFailure, tryCatch } from '@pidchashyi/try-catch';

import { env } from '@/env';

import { r2 } from '@/config/buckets';

import { response } from '@/helpers/response';

export const uploadObject = async (params: {
  key: string;
  content: string | Buffer;
  contentType: string | undefined;
}) => {
  const command = new PutObjectCommand({
    Bucket: env.CLOUDFLARE_R2_BUCKET_NAME,
    Key: params.key,
    Body: params.content,
    ContentType: params.contentType ?? 'text/plain'
  });

  const result = await tryCatch(r2.send(command));

  if (isFailure(result)) {
    return response({
      data: undefined,
      message: 'Upload object: Failed to upload object',
      success: false
    });
  }

  return response({
    data: result.data,
    message: 'Upload object: Successfully uploaded object',
    success: true
  });
};

export const deleteObject = async (params: { key: string }) => {
  // Decode the key to handle Cyrillic and other special characters
  const decodedKey = decodeURIComponent(params.key);

  const command = new DeleteObjectCommand({
    Bucket: env.CLOUDFLARE_R2_BUCKET_NAME,
    Key: decodedKey
  });

  const result = await tryCatch(r2.send(command));

  if (isFailure(result)) {
    return response({
      data: undefined,
      message: 'Delete object: Failed to delete object',
      success: false
    });
  }

  return response({
    data: result.data,
    message: 'Delete object: Successfully deleted object',
    success: true
  });
};
