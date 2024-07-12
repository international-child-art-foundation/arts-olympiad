import { ArtworksDataRequest } from "@/interfaces/gallery_shapes";
import { GenericResponse, TotalVotesResponse, ResponseWithoutSuccessDetails } from "@/interfaces/api_shapes";
import { returnErrorAsString } from "./helper-functions";
import { ArtworksResponse } from "@/interfaces/gallery_shapes";
import { UserArtworkSchema } from "@/interfaces/artwork_shapes";

export async function getSingleArtworkData(artwork_sk: string): Promise<GenericResponse> {
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
      return { success: true, data: result };
    } else {
      return { success: false, error: result.message };
    }
  } catch (error) {
    const errorString = returnErrorAsString(error);
    return { success: false, error: errorString };
  }
}

// import { artworks } from "../../mock/artworks";

// Create a cache object to store results
// const cache: Record<string, UserArtworkSchema[]> = {};

export async function getArtworksData(data: ArtworksDataRequest): Promise<ArtworksResponse> {
  try {
    // Construct the query parameters
    const queryParams = new URLSearchParams();

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
      console.log(cache[url]);
      return { success: true, data: cache[url] };
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

    return { success: true, data: result };

  } catch (error) {
    const errorString = returnErrorAsString(error);
    return { success: false, error: errorString };
  }
}

const cache: Record<string, UserArtworkSchema[]> = {};
export async function getArtworks({is_approved = true, sort_by = "votes", order_by = "descending"}): Promise<ArtworksResponse> {

  const queryParams = new URLSearchParams();
  queryParams.append("is_approved", is_approved.toString());
  queryParams.append("sort_by", sort_by);
  queryParams.append("order_by", order_by);
  const url = `/next-proxy/api/artworks?${queryParams.toString()}`;

  // Caching not necessary anymore but might as well be kept
  if (cache[url]) {
    console.log("Returning cached API result");
    console.log(cache[url]);
    return { success: true, data: cache[url] };
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_AK || "",
      },
    });
    if (!response.ok) {
      return { success: false, error: "Error fetching data"};
    }

    const result = await response.json();
    // Cache the result
    cache[url] = result;

    // const duplicatedResults = [];
    // while (duplicatedResults.length < 500) {
    //   duplicatedResults.push(...result);
    // }
    // duplicatedResults.length = 500; 

    return { success: true, data: result };
  } catch (error) {
    const errorString = returnErrorAsString(error);
    return { success: false, error: errorString };
  }
}

export async function voteForArtwork(artwork_sk: string): Promise<ResponseWithoutSuccessDetails> {
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
      return { success: true };
    } else {
      return { success: false, error: result.message };
    }
  } catch (error) {
    const errorString = returnErrorAsString(error);
    return { success: false, error: errorString };
  }
}

export async function getTotalVotes(): Promise<TotalVotesResponse> {
  try {
    const response = await fetch("/next-proxy/api/votes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_AK || "",
      },
    });

    const result = await response.json();

    if (response.ok) {
      return {success: true, total_votes: result.votes};
    } else {
      return { success: false };
    }
  } catch (error) {
    return { success: false };
  }
}