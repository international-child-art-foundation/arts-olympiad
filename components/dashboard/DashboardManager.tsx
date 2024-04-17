"use client";
import React, { useState, useEffect } from "react";
import { DashboardTabs, DashboardLoadingStates } from "../../mock/DashboardTypes";
import { fakeUserData } from "../../mock/fakeUserData";
import { DashboardMainTab } from "../../components/dashboard/DashboardMainTab";
import { DashboardTabSection } from "./DashboardTabSection";
import { YourVoteTab } from "./YourVoteTab";
import { useRouter, useSearchParams } from "next/navigation";
import { useDashboardContext } from "./DashboardContext";
import { fakeUserArtworkData } from "../../mock/fakeUserArtworkData";

export default function DashboardManager() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Create our dashboard state variable
  const [dashboardTab, setDashboardTab] = useState<DashboardTabs>(DashboardTabs.Dashboard);
  const [dashboardLoadingState, setDashboardLoadingState] = useState<DashboardLoadingStates>(DashboardLoadingStates.Loading);
  const {setUserData, setArtworkData} = useDashboardContext();

  // On page load, get and set user data once
  useEffect(() => {
    setTimeout(() => { // Simulate API call wait time
      setUserData(fakeUserData);
      setArtworkData(fakeUserArtworkData);
      setDashboardLoadingState(DashboardLoadingStates.Loaded);
    }, 1000);
  });

  const handleTabClick = (tabIdentity: DashboardTabs) => {
    setDashboardTab(tabIdentity);
  };

  // Set state based on URL on page load
  useEffect(() => {
    const tabParam = searchParams.get("tab") as string;
    if (tabParam && Object.values(DashboardTabs).includes(tabParam as DashboardTabs)) {
      setDashboardTab(tabParam as DashboardTabs);
    }
  }, [ searchParams ]);
    

  useEffect(() => {
    const updateDashboardURL = () => {
      const currentParams = new URLSearchParams();
      currentParams.set("tab", dashboardTab.toString());
      router.push(`${window.location.pathname}?${currentParams.toString()}`, { scroll: false });
    };
  
    updateDashboardURL();
  }, [dashboardTab, router]);
  
  return(
    <div className=" max-w-screen-2xl m-auto w-full " 
      style={{
        
      }}>
      <div className="flex flex-col md:grid md:grid-cols-2 md:px-8"style={{            gridTemplateColumns: "minmax(260px, 17%) 1fr",
        boxShadow: "inset 0px 5px 10px 0px rgba(0, 0, 0, 0.05)",
        clipPath: "inset(0px 10px)",
        backdropFilter: "blur(15px)"
      }}>
        <DashboardTabSection dashboardTab={dashboardTab} handleTabClick={handleTabClick}/>
        <div className="p-10">
          <div className="xl:w-[80%] m-auto max-w-[800px]">

            {dashboardTab == DashboardTabs.Dashboard && <DashboardMainTab dashboardLoadingState={dashboardLoadingState} />}
            {dashboardTab == DashboardTabs.YourVote && <YourVoteTab dashboardLoadingState={dashboardLoadingState} />}
          </div>
        </div>
      </div>
    </div>
  );
}