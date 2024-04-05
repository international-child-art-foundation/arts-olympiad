"use client";
import React, { useState, useEffect } from "react";
import { DashboardTabs, DashboardLoadingStates } from "../../mock/DashboardTypes";
import { fakeUserData } from "../../mock/fakeUserData";
import { DashboardMainTab } from "../../components/dashboard/DashboardMainTab";
import { DashboardTabSection } from "./DashboardTabSection";
import { YourVoteTab } from "./YourVoteTab";
import { useRouter, useSearchParams } from "next/navigation";
import { UserDataSchema } from "../../mock/userDataSchema";

export default function DashboardManager() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Create our dashboard state variable
  const [dashboardTab, setDashboardTab] = useState<DashboardTabs>(DashboardTabs.Dashboard);
  const [dashboardLoadingState, setDashboardLoadingState] = useState<DashboardLoadingStates>(DashboardLoadingStates.Loading);
  const [userData, setUserData] = useState<UserDataSchema>();

  // On page load, get and set user data once
  useEffect(() => {
    setUserData(fakeUserData); // API call occurs here
    setTimeout(() => { // Simulate API call wait time
      setDashboardLoadingState(DashboardLoadingStates.Loaded);
    }, 1000);
  }, []);

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
    <div className="grid grid-cols-2 px-4 md:px-8 lg:px-12 xl:px-16
     " style={{gridTemplateColumns: "20% 80%"}}>
      <DashboardTabSection dashboardTab={dashboardTab} handleTabClick={handleTabClick}/>
      {dashboardTab == DashboardTabs.Dashboard && <DashboardMainTab dashboardLoadingState={dashboardLoadingState} />}
      {dashboardTab == DashboardTabs.YourVote && <YourVoteTab dashboardLoadingState={dashboardLoadingState} />}
    </div>
  );
}