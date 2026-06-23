import { Metadata } from "next";
import { canonicalPath, sharedOpenGraph } from "../shared-metadata";
import DashboardManager from "../../../components/dashboard/DashboardManager";
import { Suspense } from "react";
import { DashboardContextProvider } from "../../../components/dashboard/DashboardContext";

export const metadata: Metadata = {
  ...canonicalPath("/dashboard/"),
  title: "Participant Dashboard | #MyFavoriteSport",
  description: "Manage your #MyFavoriteSport contest profile, artwork submissions, votes, and account settings from your participant dashboard.",
  openGraph: {
    ...sharedOpenGraph,
    title: "Participant Dashboard | #MyFavoriteSport",
    description: "Manage your #MyFavoriteSport contest profile, artwork submissions, votes, and account settings from your participant dashboard.",
  }
};

export default function DashboardPage() {

  return(
    <DashboardContextProvider>
      <Suspense>
        <DashboardManager/>
      </Suspense>
    </DashboardContextProvider>
  );
}