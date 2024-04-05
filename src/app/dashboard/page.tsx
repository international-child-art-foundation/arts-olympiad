import { Metadata } from "next";
import { sharedOpenGraph } from "../shared-metadata";
import DashboardManager from "../../../components/dashboard/DashboardManager";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Contest | My Favorite Sport",
  openGraph: {
    ...sharedOpenGraph,
    title: "Contest | My Favorite Sport",
  }
};

export default function DashboardPage() {

  return(
    <Suspense>
      <DashboardManager/>
    </Suspense>
  );
}