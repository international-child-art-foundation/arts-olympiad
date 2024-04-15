import { Metadata } from "next";
import { sharedOpenGraph } from "../shared-metadata";
import DashboardManager from "../../../components/dashboard/DashboardManager";
import { Suspense } from "react";
import { DashboardContextProvider } from "../../../components/dashboard/DashboardContext";

export const metadata: Metadata = {
  title: "Dashboard | My Favorite Sport",
  openGraph: {
    ...sharedOpenGraph,
    title: "Dashboard | My Favorite Sport",
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