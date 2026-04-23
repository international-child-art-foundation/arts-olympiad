"use client";
import React, { useState } from "react";
import {
  handleBanUser,
  handleFetchUnapprovedArtworks,
  handleApproveArtwork,
  handleDeleteArtwork,
  handleRefundUser,
} from "@/utils/api-volunteer-artwork-functions";
import Image from "next/image";
import { UserArtworkSchema } from "@/interfaces/artwork_shapes";
import { limiter } from "@/utils/api-rate-limit";
import { SelectedArtworkDisplay } from "./SelectedArtworkDisplay";
import Bottleneck from "bottleneck";
import { Modal } from "../../components/common/ui/Modal";

type ArtworkStatus = "approved" | "denied" | "banned" | "refunded";

const FETCH_PAGE_SIZE = 100;
const MAX_PAGES = 200;

export const ArtworkApproval = () => {
  const [artworks, setArtworks] = useState<UserArtworkSchema[] | null>(null);
  const [selectedArtwork, setSelectedArtwork] =
    useState<UserArtworkSchema | null>(null);
  const [artworkStatuses, setArtworkStatuses] = useState<
    Record<string, ArtworkStatus>
  >({});
  const [apiError, setApiError] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<"refund" | "ban" | null>(null);

  const handleModalConfirm = () => {
    if (modalAction === "refund" && selectedArtwork) {
      onRefundUser(selectedArtwork.sk);
    } else if (modalAction === "ban" && selectedArtwork) {
      onBanUser(selectedArtwork.sk);
    }
    setIsModalOpen(false);
    setModalAction(null);
  };

  const openModal = (action: "refund" | "ban") => {
    setModalAction(action);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalAction(null);
  };

  async function onApprove(artwork_sk: string) {
    try {
      const artworkStatus = await limiter.schedule(() =>
        handleApproveArtwork({ artwork_sk }),
      );
      if (artworkStatus?.success === true) {
        setSelectedArtwork(null);
        setArtworkStatuses((prev) => ({ ...prev, [artwork_sk]: "approved" }));
        setApiError("");
      } else {
        setApiError("An error has occurred. Try again later.");
      }
    } catch (error) {
      if (error instanceof Bottleneck.BottleneckError) {
        setApiError("Error: Rate limit reached.");
      } else {
        setApiError("An error has occurred. Try again later.");
      }
    }
  }

  async function onDeny(artwork_sk: string) {
    try {
      const artworkStatus = await limiter.schedule(() =>
        handleDeleteArtwork({ artwork_sk }),
      );
      if (artworkStatus.success === true) {
        setArtworkStatuses((prev) => ({ ...prev, [artwork_sk]: "denied" }));
        setApiError("");
      } else {
        setApiError("An error has occurred. Try again later.");
      }
    } catch (error) {
      if (error instanceof Bottleneck.BottleneckError) {
        setApiError("Error: Rate limit reached.");
      } else {
        setApiError("An error has occurred. Try again later.");
      }
    }
  }

  async function onRefundUser(artwork_sk: string) {
    const user_sk = artwork_sk;
    try {
      const refundUser = await limiter.schedule(() =>
        handleRefundUser({ user_sk }),
      );
      if (refundUser.success === true) {
        setArtworkStatuses((prev) => ({ ...prev, [artwork_sk]: "refunded" }));
        setApiError("");
      } else {
        setApiError("An error has occurred. Try again later.");
      }
    } catch (error) {
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
      const artworkStatus = await limiter.schedule(() =>
        handleBanUser({ user_sk }),
      );
      if (artworkStatus.success === true) {
        setArtworkStatuses((prev) => ({ ...prev, [artwork_sk]: "banned" }));
        setApiError("");
      } else {
        setApiError("An error has occurred. Try again later.");
      }
    } catch (error) {
      if (error instanceof Bottleneck.BottleneckError) {
        setApiError("Error: Rate limit reached.");
      } else {
        setApiError("An error has occurred. Try again later.");
      }
    }
  }

  const handleFetchArtworks = async () => {
    if (isFetching) return;
    setIsFetching(true);
    setApiError("");

    const accumulated: UserArtworkSchema[] = [];
    let cursor = 0;
    let pagesFetched = 0;

    try {
      while (pagesFetched < MAX_PAGES) {
        const response = await limiter.schedule(() =>
          handleFetchUnapprovedArtworks({ cursor, limit: FETCH_PAGE_SIZE }),
        );

        if (!response?.success) {
          setApiError("Some pages failed to load. Showing partial results.");
          break;
        }

        accumulated.push(...response.data.items);
        pagesFetched += 1;

        if (response.data.nextCursor === null) break;
        cursor = response.data.nextCursor;
      }

      if (pagesFetched >= MAX_PAGES) {
        setApiError(
          "Queue is unusually large — showing first " +
            accumulated.length +
            " items.",
        );
      }

      setArtworks(accumulated);
    } catch (error) {
      if (error instanceof Bottleneck.BottleneckError) {
        setApiError("Error: Rate limit reached.");
      } else {
        setApiError("An error has occurred. Try again later.");
      }
      if (accumulated.length > 0) setArtworks(accumulated);
    } finally {
      setIsFetching(false);
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
      <div className="text-center mb-4">
        Hello from the artwork approval component! You are authenticated as a
        volunteer.
      </div>
      <div className="w-full text-center py-4">
        <button
          className="bg-new-blue text-white p-2 px-4 rounded-lg mx-auto active:scale-95 disabled:opacity-60"
          onClick={handleFetchArtworks}
          disabled={isFetching}
        >
          {isFetching ? "Fetching..." : "Fetch Unapproved Artworks"}
        </button>
      </div>

      {apiError && <p className="text-center my-4 text-red-600">{apiError}</p>}

      {artworks !== null && artworks.length === 0 && (
        <p className="text-center my-4">
          Found zero unapproved artworks. We're all caught up!
        </p>
      )}

      {artworks && artworks.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {artworks.map((artwork) => (
            <div
              key={artwork.sk}
              className={`relative border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer ${
                artworkStatuses[artwork.sk] === "approved"
                  ? "bg-green-200 opacity-50"
                  : artworkStatuses[artwork.sk] === "denied"
                    ? "bg-red-200 opacity-50"
                    : artworkStatuses[artwork.sk] === "banned"
                      ? "bg-gray-200 opacity-50"
                      : artworkStatuses[artwork.sk] === "refunded"
                        ? "bg-yellow-200 opacity-50"
                        : ""
              }`}
              onClick={() => handleArtworkClick(artwork)}
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
                <p className="text-sm mb-2">
                  {truncateDescription(artwork.description)}
                </p>
                <p className="text-xs text-gray-600">{artwork.location}</p>
                <p className="text-xs text-gray-600">{artwork.sport}</p>
              </div>
              {artworkStatuses[artwork.sk] && (
                <div
                  className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs text-white ${
                    artworkStatuses[artwork.sk] === "approved"
                      ? "bg-green-500"
                      : artworkStatuses[artwork.sk] === "denied"
                        ? "bg-red-500"
                        : artworkStatuses[artwork.sk] === "banned"
                          ? "bg-gray-500"
                          : artworkStatuses[artwork.sk] === "refunded"
                            ? "bg-yellow-500"
                            : ""
                  }`}
                >
                  {artworkStatuses[artwork.sk] === "approved"
                    ? "Approved"
                    : artworkStatuses[artwork.sk] === "denied"
                      ? "Denied"
                      : artworkStatuses[artwork.sk] === "banned"
                        ? "User Banned"
                        : artworkStatuses[artwork.sk] === "refunded"
                          ? "Refunded"
                          : ""}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {selectedArtwork && (
        <SelectedArtworkDisplay
          apiError={apiError}
          selectedArtwork={selectedArtwork}
          setSelectedArtwork={setSelectedArtwork}
          onApprove={onApprove}
          onDeny={onDeny}
          onBanUser={() => openModal("ban")}
          onRefundUser={() => openModal("refund")}
        />
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="text-center">
          <h2 className="text-xl mb-4">
            Are you sure you want to{" "}
            {modalAction === "refund" ? "refund this user" : "ban this user"}?
          </h2>
          <div className="flex justify-center space-x-4">
            <button
              className={`px-4 py-2 rounded-lg text-white ${
                modalAction === "refund" ? "bg-yellow-500" : "bg-red-500"
              }`}
              onClick={handleModalConfirm}
            >
              Confirm {modalAction === "refund" ? "Refund" : "Ban"}
            </button>
            <button
              className="px-4 py-2 rounded-lg text-white bg-gray-500"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
