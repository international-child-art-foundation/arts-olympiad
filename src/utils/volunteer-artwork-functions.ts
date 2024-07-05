import { VolunteerArtworkInterface, VolunteerUserInterface } from "@/interfaces/artwork_shapes";

export async function handleFetchUnapprovedArtworks({}) {

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
      return { success: gatewayServerResponse.ok, message: result };
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

export async function handleApproveArtwork({
  artwork_sk,
}: VolunteerArtworkInterface) {
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
      return { success: gatewayServerResponse.ok, message: result };
    }
  } catch (error) {
    console.log("error approving artwork", error);
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

export async function handleDeleteArtwork({
  artwork_sk,
}: VolunteerArtworkInterface) {
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
    }
  } catch (error) {
    console.log("error denying artwork", error);
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

export async function handleBanUser({
  user_sk,
}: VolunteerUserInterface) {
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
    }
  } catch (error) {
    console.log("error denying artwork", error);
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
