export async function getSingleArtworkData(artwork_id: string) {
  try {
    const response = await fetch(`/next-proxy/api/artworks/${artwork_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_AK || "",
      },
    });

    const result = await response.json();

    if (response.ok) {
      return result;
    } else {
      return { message: result.message };
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

    return { success: false, message: errorMessage };
  }
}
