"use client";
import React, { useState } from "react";
import { handleBanUser, handleFetchUnapprovedArtworks, handleApproveArtwork, handleDeleteArtwork } from "@/utils/api-volunteer-artwork-functions";
import Image from "next/image";
import { ApiArtworksResponse, UserArtworkSchema } from "@/interfaces/artwork_shapes";
import { limiter } from "@/utils/api-rate-limit";
import { SelectedArtworkDisplay} from "./SelectedArtworkDisplay";
import Bottleneck from "bottleneck";

type ArtworkStatus = "approved" | "denied" | "banned" | null;

export const ArtworkApproval = () => {
  const [result, setResult] = useState<ApiArtworksResponse | null>(null);
  const [selectedArtwork, setSelectedArtwork] = useState<UserArtworkSchema | null>(null);
  const [artworkStatuses, setArtworkStatuses] = useState<Record<string, ArtworkStatus>>({});
  const [apiError, setApiError] = useState("");

  async function onApprove(artwork_sk: string) {
    console.log(artwork_sk);
    try {
      const artworkStatus = await limiter.schedule(() => handleApproveArtwork({artwork_sk}));
      if (artworkStatus?.success == true) {
        setSelectedArtwork(null);
        setArtworkStatuses(prev => ({...prev, [artwork_sk]: "approved"}));
        console.log(artwork_sk + " has successfully been approved.");
      } else {
        setApiError("An error has occurred. Try again later.");
      }
    } catch(error) {
      if (error instanceof Bottleneck.BottleneckError) {
        setApiError("Error: Rate limit reached.");
      } else {
        setApiError("An error has occurred. Try again later.");
      }
    }
  }

  async function onDeny(artwork_sk: string) {
    console.log(artwork_sk);
    try {
      const artworkStatus = await limiter.schedule(() => handleDeleteArtwork({artwork_sk}));
      if (artworkStatus.success == true) {
        setArtworkStatuses(prev => ({...prev, [artwork_sk]: "denied"}));
        console.log(artwork_sk + " has been denied.");
      } else {
        setApiError("An error has occurred. Try again later.");
        console.log("Failed to delete artwork " + artwork_sk);
      }
    } catch(error) {
      if (error instanceof Bottleneck.BottleneckError) {
        setApiError("Error: Rate limit reached.");
      } else {
        setApiError("An error has occurred. Try again later.");
      }
    }
  }

  async function onBanUser(artwork_sk: string) {
    const user_sk = artwork_sk;
    try {
      const artworkStatus = await limiter.schedule(() => handleBanUser({user_sk}));
      if (artworkStatus.success == true) {
        console.log(artwork_sk);
        setArtworkStatuses(prev => ({...prev, [artwork_sk]: "banned"}));
        console.log("User associated with " + artwork_sk + " has been banned.");
      } else {
        setApiError("An error has occurred. Try again later.");
      } 
    } catch(error) {
      if (error instanceof Bottleneck.BottleneckError) {
        setApiError("Error: Rate limit reached.");
      } else {
        setApiError("An error has occurred. Try again later.");
      }
    }
  }

  const handleFetchArtworks = async () => {
    try {
      const response = await limiter.schedule(() => handleFetchUnapprovedArtworks());
      if (response) {
        setResult(response as ApiArtworksResponse);
        console.log("API Response:", response);
      }
    } catch(error) {
      if (error instanceof Bottleneck.BottleneckError) {
        setApiError("Error: Rate limit reached.");
      } else {
        setApiError("An error has occurred. Try again later.");
      }
    }
  };

  const truncateDescription = (description: string, maxLength = 100) => {
    if (description.length <= maxLength) return description;
    return description.slice(0, maxLength) + "...";
  };

  const handleArtworkClick = (artwork: UserArtworkSchema) => {
    setSelectedArtwork(artwork);
  };

  return (
    <div className="p-4">
      <div className="text-center mb-4">Hello from the artwork approval component! You are authenticated as a volunteer.</div>
      <div className="w-full text-center py-4">
        <button className="bg-new-blue text-white p-2 px-4 rounded-lg mx-auto active:scale-95" onClick={handleFetchArtworks}>
          Fetch Unapproved Artworks
        </button>
      </div>
      
      {(result?.data.length === 0) && (
        <p className="text-center my-4">Found zero unapproved artworks. We're all caught up!</p>
      )}
      {result?.data && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {result.data.map((artwork, index) => (
            <div 
              key={index} 
              className={`relative border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer ${
                artworkStatuses[artwork.sk] === "approved" ? "bg-green-200 opacity-50" :
                  artworkStatuses[artwork.sk] === "denied" ? "bg-red-200 opacity-50" :
                    artworkStatuses[artwork.sk] === "banned" ? "bg-gray-200 opacity-50" : ""
              }`}
              onClick={() => !artworkStatuses[artwork.sk] && handleArtworkClick(artwork)}
            >
              <div className="relative h-48">
                <Image 
                  src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_DISTRIBUTION_URL}/${artwork.sk}/initial.${artwork.file_type}`} 
                  layout="fill"
                  objectFit="cover"
                  alt={`Artwork titled: ${artwork.f_name}`} 
                />
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-600">{artwork.sk}</p>
                <p className="text-sm mb-2">{truncateDescription(artwork.description)}</p>
                <p className="text-xs text-gray-600">{artwork.location}</p>
                <p className="text-xs text-gray-600">{artwork.sport}</p>
              </div>
              {artworkStatuses[artwork.sk] && (
                <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs text-white ${
                  artworkStatuses[artwork.sk] === "approved" ? "bg-green-500" :
                    artworkStatuses[artwork.sk] === "denied" ? "bg-red-500" :
                      "bg-gray-500"
                }`}>
                  {artworkStatuses[artwork.sk] === "approved" ? "Approved" :
                    artworkStatuses[artwork.sk] === "denied" ? "Denied" : "User Banned"}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {selectedArtwork && <SelectedArtworkDisplay apiError={apiError} selectedArtwork={selectedArtwork} setSelectedArtwork={setSelectedArtwork} onApprove={onApprove} onDeny={onDeny} onBanUser={onBanUser}/>}
    </div>
  );
};