export type PresignedUrlResponse = PresignedUrlSuccessResponse | PresignedUrlErrorResponse;

export interface PresignedUrlSuccessResponse {
  success: true;
  data: PresignedUrlBody;
}

interface PresignedUrlErrorResponse {
  success: false;
  error: string;
}

export interface PresignedUrlRequest {
  fileType: string;
}

interface S3PresignedFields {
  [key: string]: string;
}

interface PresignedUrlBody {
  s3_presigned_url: string;
  fields: S3PresignedFields;
}

export interface UploadResponse {
  success: boolean;
  message: string;
}

export interface VolunteerArtworkInterface {
  artwork_sk: string;
}

export interface VolunteerUserInterface {
  user_sk: string;
}

export interface UserArtworkSchema {
	sk: string; // This is ID
	f_name: string;
	age: number;
	sport: string;
	location: string;
	is_ai_gen: boolean;
  model?: string;
	prompt?: string;
	is_approved: boolean;
	votes: number;
	description: string;
	file_type: string;
}

export type ApiArtworksResponse = {
  success: boolean;
  data: UserArtworkSchema[];
};
