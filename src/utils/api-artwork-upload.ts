import { PresignedUrlRequest, PresignedUrlResponse, PresignedUrlSuccessResponse } from "@/interfaces/artwork_shapes";
import { ModifiedUploadFormData } from "../../mock/formDataStructs";
import { GenericResponse, ResponseWithoutSuccessDetails } from "@/interfaces/api_shapes";
// import { returnErrorAsString } from "./helper-functions";

export async function generatePresignedUrl({
  fileType
}: PresignedUrlRequest): Promise<PresignedUrlResponse> {
  const requestBody = JSON.stringify({
    file_type: fileType
  });

  try {
    const gatewayServerResponse = await fetch("/next-proxy/api/users/presigned-url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_AK || "",
      },
      body: requestBody,
      credentials: "include",
    });

    const result = await gatewayServerResponse.json();
    console.log(result);

    if (gatewayServerResponse.ok) {
      return {
        success: true,
        data: {
          s3_presigned_url: result.s3_presigned_url,
          fields: result.fields
        }
      };
    } else {
      throw new Error("Error generating URL");
    }
  } catch (error) {
    throw new Error("Error generating URL");
  }
}

export async function uploadImageToS3(imageFile: File | null, presignedUrlResponse: PresignedUrlSuccessResponse): Promise<ResponseWithoutSuccessDetails> {
  if (!presignedUrlResponse.data || !presignedUrlResponse.data.s3_presigned_url || !presignedUrlResponse.data.fields) {
    return { success: false, error: "Presigned URL data is incomplete or not received." };
  }
  if (imageFile == null) {
    return { success: false, error: "Image file was not received."};
  }
  const { fields, s3_presigned_url } = presignedUrlResponse.data; // can also grab presigned_url but don't need
  const formData = new FormData();
  Object.keys(fields).forEach(key => {
    formData.append(key, fields[key]);
  });
  // append file data last
  formData.append("file", imageFile);
  try {
    await fetch(s3_presigned_url, {
      method: "POST",
      body: formData
    });
    return { success: true };
  } catch (error) {
    throw new Error("Error uploading image");
  }
}

// postArtworkEntryToDDB should only run after we receive a 204 response from uploadImageToS3
export async function postArtworkEntryToDDB(formData: ModifiedUploadFormData): Promise<GenericResponse> {
  try {
    const gatewayServerResponse = await fetch("/next-proxy/api/artworks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_AK || "",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    });

    const result = await gatewayServerResponse.json();
    if (gatewayServerResponse.ok) {
      return { success: gatewayServerResponse.ok, data: result.message };
    } else {
      throw new Error("Error posting to DDB");
    }
  } catch (error) {
    throw new Error("Error posting to DDB");
  }
}
