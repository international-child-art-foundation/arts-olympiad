import React from "react";
import { sharedOpenGraph } from "../shared-metadata";
import { Metadata } from "next";
import { ArtworkApprovalWrapper } from "../../../components/volunteer/ArtworkApprovalWrapper";

export const metadata: Metadata = {
  title: "Team | My Favorite Sport",
  openGraph: {
    ...sharedOpenGraph,
    title: "Team | My Favorite Sport",
  }
};

export default function page() {
  return (
    <div className="relative my-10 w-full max-w-screen-2xl m-auto px-6 md:px-8 lg:px-16 xl:px-20">
      <ArtworkApprovalWrapper/>
    </div>
  );
}