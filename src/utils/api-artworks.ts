// import { ArtworksDataRequest } from "@/interfaces/gallery_shapes";
// import { returnErrorAsString } from "./helper-functions";
import { GenericResponse, TotalVotesResponse, ResponseWithoutSuccessDetails } from "@/interfaces/api_shapes";
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
      throw new Error("Error getting single artwork data");
    }
  } catch (error) {
    throw new Error("Error getting single artwork data");
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

    throw new Error("Error getting artwork data");
  } catch (error) {
    throw new Error("Error getting artwork data");
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

    await response.json();

    if (response.ok) {
      return { success: true };
    } else {
      throw new Error("Error voting for artwork");
    }
  } catch (error) {
    throw new Error("Error voting for artwork");
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
      throw new Error("Error getting total votes");
    }
  } catch (error) {
    throw new Error("Error getting total votes");
  }
}