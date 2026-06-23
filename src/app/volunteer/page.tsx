import React from "react";
import { canonicalPath, sharedOpenGraph } from "../shared-metadata";
import { Metadata } from "next";
import { ArtworkApprovalWrapper } from "../../../components/volunteer/ArtworkApprovalWrapper";

export const metadata: Metadata = {
  ...canonicalPath("/volunteer/"),
  title: "Volunteer Artwork Review | #MyFavoriteSport",
  description: "Review submitted #MyFavoriteSport artworks and help support a fair, creative global contest experience for young artists.",
  openGraph: {
    ...sharedOpenGraph,
    title: "Volunteer Artwork Review | #MyFavoriteSport",
    description: "Review submitted #MyFavoriteSport artworks and help support a fair, creative global contest experience for young artists.",
  }
};

export default function page() {
  return (
    <div className="relative my-10 w-full max-w-screen-2xl m-auto px-6 md:px-8 lg:px-16 xl:px-20">
      <ArtworkApprovalWrapper/>
    </div>
  );
}