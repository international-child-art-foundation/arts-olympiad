// import { ArtworksDataRequest } from "@/interfaces/gallery_shapes";
// import { returnErrorAsString } from "./helper-functions";
import {
  GenericResponse,
  TotalVotesResponse,
  ResponseWithoutSuccessDetails,
} from "@/interfaces/api_shapes";
import { ArtworksResponse } from "@/interfaces/gallery_shapes";
import {
  UserArtworkSchema,
  GetArtworksParams,
  ArtworksPage,
} from "@/interfaces/artwork_shapes";

export async function getSingleArtworkData(
  artwork_sk: string,
): Promise<GenericResponse> {
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

export async function getArtworks({
  is_approved = true,
  sort_by = "votes",
  order_by = "descending",
  sports = [],
  countries = [],
  limit = 20,
  cursor = 0,
}: GetArtworksParams = {}): Promise<ArtworksResponse> {
  const qp = new URLSearchParams();
  qp.append("is_approved", String(is_approved));
  qp.append("sort_by", sort_by);
  qp.append("order_by", order_by);
  qp.append("limit", String(limit));
  qp.append("cursor", String(cursor));
  if (sports.length > 0) qp.append("sports", sports.join(","));
  if (countries.length > 0) qp.append("countries", countries.join(","));

  const url = `/next-proxy/api/artworks?${qp.toString()}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_AK || "",
      },
    });
    if (!response.ok) {
      return { success: false, error: "Error fetching data" };
    }
    const data = (await response.json()) as ArtworksPage;
    return { success: true, data };
  } catch (error) {
    throw new Error("Error getting artwork data");
  }
}

export async function voteForArtwork(
  artwork_sk: string,
): Promise<ResponseWithoutSuccessDetails> {
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
      return { success: true, total_votes: result.votes };
    } else {
      throw new Error("Error getting total votes");
    }
  } catch (error) {
    throw new Error("Error getting total votes");
  }
}
