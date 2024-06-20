export interface PresignedUrlRequest {
  fileType: string;
}

export interface PresignedUrlResponse {
  success: boolean;
  message: string;
  body?: PresignedUrlBody;
}


interface S3PresignedFields {
  [key: string]: string;  // Index signature for dynamic keys
}

interface PresignedUrlBody {
  s3_presigned_url: string;
  fields: S3PresignedFields;
}

export type UploadResponse = number | { message: string }; // Success = 204 response as number, fail = message
