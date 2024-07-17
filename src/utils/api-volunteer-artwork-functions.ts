import { VolunteerArtworkInterface, VolunteerUserInterface } from "@/interfaces/artwork_shapes";
// import { returnErrorAsString } from "./helper-functions";
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
      throw new Error("Error fetching unapproved artworks");
    }
  } catch (error) {
    throw new Error("Error fetching unapproved artworks");
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
      throw new Error("Error approving artwork");
    }
  } catch (error) {
    throw new Error("Error approving artwork");
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
      throw new Error("Error deleting artwork");
    }
  } catch (error) {
    throw new Error("Error deleting artwork");
  }
}

export async function handleRefundUser({
  user_sk,
}: VolunteerUserInterface): Promise<ResponseWithoutSuccessDetails> {
  try {
    const gatewayServerResponse = await fetch(`/next-proxy/api/refund-user/${user_sk}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_AK || "",
      },
      credentials: "include",
    });

    if (gatewayServerResponse.ok) {
      return { success: gatewayServerResponse.ok };
    } else {
      throw new Error("Error refunding user");
    }
  } catch (error) {
    throw new Error("Error refunding user");
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
      throw new Error("Error banning user");
    }
  } catch (error) {
    throw new Error("Error banning user");
  }
}
