"use client";
import React, { useState } from "react";
import { handleBanUser, handleFetchUnapprovedArtworks, handleApproveArtwork, handleDenyArtwork } from "@/utils/volunteer-artwork-functions";
import Image from "next/image";
import { ApiArtworksResponse, userArtworkSchema } from "../../mock/userArtworkSchema";
import { SelectedArtworkDisplay} from "./SelectedArtworkDisplay";

type ArtworkStatus = "approved" | "denied" | "banned" | null;

export const ArtworkApproval = () => {
  const [result, setResult] = useState<ApiArtworksResponse | null>(null);
  const [selectedArtwork, setSelectedArtwork] = useState<userArtworkSchema | null>(null);
  const [artworkStatuses, setArtworkStatuses] = useState<Record<string, ArtworkStatus>>({});

  async function onApprove(artwork_id: string) {
    console.log(artwork_id);
    const artworkStatus = await handleApproveArtwork({artwork_id});
    if (artworkStatus?.success == true) {
      setSelectedArtwork(null);
      setArtworkStatuses(prev => ({...prev, [artwork_id]: "approved"}));
      console.log(artwork_id + " has successfully been approved.");
    } else {
      console.log("Failed to approve artwork " + artwork_id);
    }
  }

  async function onDeny(artwork_id: string) {
    console.log(artwork_id);
    const artworkStatus = await handleDenyArtwork({artwork_id});
    if (artworkStatus?.success == true) {
    
      setArtworkStatuses(prev => ({...prev, [artwork_id]: "denied"}));
      console.log(artwork_id + " has been denied.");
    } else {
      console.log("Failed to delete artwork " + artwork_id);
    }
  }

  async function onBanUser(artwork_id: string) {
    const user_id = artwork_id;
    const artworkStatus = await handleBanUser({user_id});
    if (artworkStatus?.success == true) {
      console.log(artwork_id);
      setArtworkStatuses(prev => ({...prev, [artwork_id]: "banned"}));
      console.log("User associated with " + artwork_id + " has been banned.");
    } else {
      console.log("Failed to ban user " + artwork_id);
    }
  }

  const handleFetchArtworks = async () => {
    const response = await handleFetchUnapprovedArtworks({});
    if (response) {
      setResult(response as ApiArtworksResponse);
      console.log("API Response:", response);
    }
  };

  const truncateDescription = (description: string, maxLength = 100) => {
    if (description.length <= maxLength) return description;
    return description.slice(0, maxLength) + "...";
  };

  const handleArtworkClick = (artwork: userArtworkSchema) => {
    setSelectedArtwork(artwork);
  };

  return (
    <div className="p-4">
      <div className="text-center mb-4">Hello from the artwork approval component! You are authenticated as a volunteer.</div>
      <div className="w-full text-center py-4">
        <button className="bg-new-blue text-white p-2 rounded-lg mx-auto" onClick={handleFetchArtworks}>
          Fetch Unapproved Artworks
        </button>
      </div>
      
      {result?.message && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {result.message.map((artwork, index) => (
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

      {selectedArtwork && <SelectedArtworkDisplay selectedArtwork={selectedArtwork} setSelectedArtwork={setSelectedArtwork} onApprove={onApprove} onDeny={onDeny} onBanUser={onBanUser}/>}
    </div>
  );
};