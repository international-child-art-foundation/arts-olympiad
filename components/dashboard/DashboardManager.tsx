"use client";
import React, { useState, useEffect } from "react";
import { DashboardTabs, DashboardLoadingStates, dashboardTypeStringConversions, DashboardUrls } from "../../mock/DashboardTypes";
import { fakeUserData } from "../../mock/fakeUserData";
import { DashboardMainTab } from "../../components/dashboard/DashboardMainTab";
import { DashboardTabSection } from "./DashboardTabSection";
import { YourVoteTab } from "./YourVoteTab";
import { useRouter, useSearchParams } from "next/navigation";
import { useDashboardContext } from "./DashboardContext";
import { fakeUserArtworkData } from "../../mock/fakeUserArtworkData";
import { DashboardModal } from "./DashboardModal";
import { DeleteArtwork } from "./DeleteArtwork";
import { getAuthStatus } from "@/utils/auth";

export default function DashboardManager() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // This state and function were used to test whether authentication can be verified
  // in its current state. Authentication status should be checked upon login,
  // authenticated page visits, and API requests. We will also need to manage refresh 
  // token tasks manually which will likely occur when authentication status is checked. 
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  async function checkAuthStatus() {
    const authStatus = await getAuthStatus();
    setIsAuthenticated(authStatus.isAuthenticated);
    console.log("Authentication status:", authStatus.isAuthenticated);
  }

  useEffect(() => {
    console.log("Authentication status:", isAuthenticated);
  }, [isAuthenticated]); // Dependency array includes isAuthenticated to log its updates


  // Create our dashboard state variable
  const [dashboardTab, setDashboardTab] = useState<DashboardTabs>("Dashboard");
  const [dashboardLoadingState, setDashboardLoadingState] = useState<DashboardLoadingStates>("Loading");
  const {setApiUserData, setApiArtworkData, displayModal} = useDashboardContext();

  // On page load, get and set user data once
  useEffect(() => {
    setTimeout(() => { // Simulate API call wait time
      setApiUserData(fakeUserData);
      setApiArtworkData(fakeUserArtworkData);
      setDashboardLoadingState("Loaded" as DashboardLoadingStates);
    }, 1000);
  });

  const handleTabClick = (tabIdentity: DashboardTabs) => {
    setDashboardTab(tabIdentity);
  };

  // Set state based on URL on page load
  useEffect(() => {
    const tabParam = searchParams?.get("tab") as DashboardUrls;
    if (tabParam) {
      const tabKey = Object.keys(dashboardTypeStringConversions).find(key => dashboardTypeStringConversions[key as DashboardTabs].url === tabParam);
      if (tabKey) {
        setDashboardTab(tabKey as DashboardTabs);
      }
    } else {
      setDashboardTab("Dashboard" as DashboardTabs);
    }
  }, [searchParams]);
    
  useEffect(() => {
    const updateDashboardURL = () => {
      const currentParams = new URLSearchParams();
      currentParams.set("tab", dashboardTypeStringConversions[dashboardTab].url.toString());
      router.push(`${window.location.pathname}?${currentParams.toString()}`, { scroll: false });
    };
    updateDashboardURL();
  }, [dashboardTab, router]);

  return(
    <div className=" max-w-screen-2xl mx-auto w-full h-full" 
      style={{
        
      }}>
      {displayModal && 
        <DashboardModal >
          <DeleteArtwork />
        </DashboardModal>
      }
      <div className="flex flex-col md:grid md:grid-cols-2 md:px-8"style={{            gridTemplateColumns: "minmax(260px, 17%) 1fr",
        boxShadow: "inset 0px 5px 10px 0px rgba(0, 0, 0, 0.05)",
        clipPath: "inset(0px 10px)",
        backdropFilter: "blur(15px)"
      }}>
        <DashboardTabSection dashboardTab={dashboardTab} handleTabClick={handleTabClick}/>
        <div className="p-10">
          <div className="xl:w-[80%] m-auto max-w-[800px]">
            {/* Dummy button to test authentication status */}
            <button className="w-64 bg-blue-500" onClick={checkAuthStatus}>Check auth status</button>
            {dashboardTab == "Dashboard" && <DashboardMainTab dashboardLoadingState={dashboardLoadingState} />}
            {dashboardTab == "YourVote" && <YourVoteTab dashboardLoadingState={dashboardLoadingState} />}
          </div>
        </div>
      </div>
    </div>
  );
}