import { artworkDataRequest } from "@/interfaces/gallery_shapes";
import { artworkDataResponse } from "@/interfaces/gallery_shapes";

export async function getSingleArtworkData(artwork_sk: string) {
  try {
    const response = await fetch(`/next-proxy/api/artworks/${artwork_sk}`, {
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

// import { artworks } from "../../mock/artworks";

// Create a cache object to store results
const cache: Record<string, artworkDataResponse> = {};

export async function getArtworkData(data: artworkDataRequest): Promise<artworkDataResponse> {
  try {
    // Construct the query parameters
    const queryParams = new URLSearchParams();

    // Always include is_approved=true
    // queryParams.append("is_approved", "true");

    // Handle sport filters
    const activeSports = data.filterableOptions
      .find(category => category.id === "sport")?.options
      .filter(option => option.active)
      .map(option => option.name);
    if (activeSports && activeSports.length > 0) {
      queryParams.append("sport", activeSports.join(","));
    }

    // Handle location filters (combining all country categories)
    const activeLocations = data.filterableOptions
      .filter(category => ["africa", "australia", "asia", "europe", "northamerica", "southamerica"].includes(category.id))
      .flatMap(category => category.options.filter(option => option.active).map(option => option.name));
    if (activeLocations.length > 0) {
      queryParams.append("location", activeLocations.join(","));
    }

    // Include is_approved == true if there are no active locations or sports
    // API requires one or the other to be provided, otherwise no artwork is returned
    if (activeLocations.length == 0 && (!activeSports || activeSports.length == 0)) {
      queryParams.append("is_approved", "true");
    }


    // Handle sorting
    if (data.sortValue) {
      queryParams.append("order_by", data.sortValue === "Oldest" ? "ascending" : "descending");
    }

    // Add pagination
    queryParams.append("page", data.pageNumber.toString());
    queryParams.append("per_page", "20");

    // Construct the full URL
    const url = `/next-proxy/api/artworks?${queryParams.toString()}`;
    // Check if the result is already in the cache
    if (cache[url]) {
      console.log("Returning cached API result");
      return cache[url];
    }

    // Prevent API calls during testing
    // const result = { data: artworks };

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_AK || "",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    // Cache the result
    cache[url] = result;

    return result;

  } catch (error) {
    console.error("Error fetching artwork data:", error);
    let errorMessage: string;

    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    } else {
      errorMessage = "Unknown error occurred";
    }

    throw new Error(errorMessage);
  }
}

export async function voteForArtwork(artwork_sk: string) {
  try {
    const response = await fetch(`/next-proxy/api/vote/${artwork_sk}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_AK || "",
      },
    });

    const result = await response.json();

    if (response.ok) {
      return { success: true, message: result.message };
    } else {
      return { success: false, message: result.message };
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