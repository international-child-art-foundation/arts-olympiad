import { VolunteerArtworkInterface, VolunteerUserInterface } from "@/interfaces/artwork_shapes";
import { returnErrorAsString } from "./helper-functions";
import { GenericResponse, ResponseWithoutSuccessDetails } from "@/interfaces/api_shapes";

export async function handleFetchUnapprovedArtworks(): Promise<GenericResponse> {

  try {
    const gatewayServerResponse = await fetch("/next-proxy/api/artworks?is_approved=false", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_AK || "",
      },
    });

    const result = await gatewayServerResponse.json();
    console.log(result);
    if (gatewayServerResponse.ok) {
      return { success: gatewayServerResponse.ok, data: result };
    } else {
      return { success: false, error: "API call was unsuccessful" };
    }
  } catch (error) {
    const errorString = returnErrorAsString(error);
    return { success: false, error: errorString };
  }
}

export async function handleApproveArtwork({
  artwork_sk,
}: VolunteerArtworkInterface): Promise<ResponseWithoutSuccessDetails> {
  console.log(artwork_sk);
  try {
    const gatewayServerResponse = await fetch(`/next-proxy/api/artworks/${artwork_sk}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_AK || "",
      },
      body: JSON.stringify({
        is_approved: true,
      }),
      credentials: "include",
    });

    const result = await gatewayServerResponse.json();
    console.log(result);
    if (gatewayServerResponse.ok) {
      return { success: gatewayServerResponse.ok };
    } else {
      return { success: false, error: "API call was unsuccessful" };
    }
  } catch (error) {
    const errorString = returnErrorAsString(error);
    return { success: false, error: errorString };
  }
}

export async function handleDeleteArtwork({
  artwork_sk,
}: VolunteerArtworkInterface): Promise<ResponseWithoutSuccessDetails> {
  console.log(artwork_sk);
  try {
    const gatewayServerResponse = await fetch(`/next-proxy/api/artworks/${artwork_sk}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_AK || "",
      },
      credentials: "include",
    });

    if (gatewayServerResponse.ok) {
      return { success: gatewayServerResponse.ok };
    } else {
      return { success: false, error: "API call was unsuccessful" };
    }
  } catch (error) {
    const errorString = returnErrorAsString(error);
    return { success: false, error: errorString };
  }
}

export async function handleBanUser({
  user_sk,
}: VolunteerUserInterface): Promise<ResponseWithoutSuccessDetails> {
  console.log(user_sk);
  try {
    const gatewayServerResponse = await fetch(`/next-proxy/api/volunteer/update-user/${user_sk}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_AK || "",
      },
      body: JSON.stringify({
        can_submit_art: false,
      }),
      credentials: "include",
    });

    if (gatewayServerResponse.ok) {
      return { success: gatewayServerResponse.ok };
    } else {
      return { success: false, error: "API call was unsuccessful" };
    }
  } catch (error) {
    const errorString = returnErrorAsString(error);
    return { success: false, error: errorString };
  }
}
