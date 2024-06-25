import { PresignedUrlRequest, PresignedUrlResponse, UploadResponse } from "@/interfaces/artwork_shapes";
import { ModifiedUploadFormData } from "../../mock/formDataStructs";

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
        message: "Presigned URL generated successfully",
        body: {
          s3_presigned_url: result.s3_presigned_url,
          fields: result.fields
        }
      };
    } else {
      return { success: false, message: result.message || "Failed to generate presigned URL" };
    }
  } catch (error) {
    console.log("error generating presigned URL", error);
    let errorMessage: string;

    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    } else if (typeof error === "object" && error !== null && "message" in error) {
      errorMessage = (error as { message: string }).message;
    } else {
      errorMessage = "Unknown error";
    }

    return { success: false, message: errorMessage };
  }
}

export async function uploadImageToS3(imageFile: File, fileType: string, presignedUrlResponse: PresignedUrlResponse): Promise<UploadResponse> {
  if (!presignedUrlResponse.body || !presignedUrlResponse.body.s3_presigned_url || !presignedUrlResponse.body.fields) {
    return { success: false, message: "Presigned URL data is incomplete or not received." };
  }
  const { fields } = presignedUrlResponse.body; // can also grab presigned_url but don't need
  const formData = new FormData();
  Object.keys(fields).forEach(key => {
    formData.append(key, fields[key]);
  });
  // append file data last
  formData.append("file", imageFile);
  
  try {
    const response = await fetch("/s3", {
      method: "POST",
      body: formData
    });
    return { success: true, message: response.status.toString() };
  } catch (error) {
    console.error("Failed to upload image using presigned URL", error);
    return { success: false, message: "Upload failed: " + (error instanceof Error ? error.message : "Unknown error") };
  }
}

// postArtworkEntryToDDB should only run after we receive a 204 response from uploadImageToS3
export async function postArtworkEntryToDDB(formData: ModifiedUploadFormData) {
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
    console.log(gatewayServerResponse);
    console.log(result);
    if (gatewayServerResponse.ok) {
      return { success: gatewayServerResponse.ok, message: result.message };
    } else {
      return { success: gatewayServerResponse.ok, message: result.message};
    }
  } catch (error) {
    console.log("error checking authentication status", error);
    let errorMessage: string;

    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    } else if (typeof error === "object" && error !== null && "message" in error) {
      errorMessage = (error as { message: string }).message;
    } else {
      errorMessage = "Unknown error";
    }
    return { message: errorMessage };
  }
}
