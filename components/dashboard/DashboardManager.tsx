"use client";
import React, { useState, useEffect } from "react";
import { DashboardTabs, DashboardLoadingStates, dashboardTypeStringConversions, DashboardUrls, DashboardAuthenticationStates } from "../../mock/DashboardTypes";
// import { fakeUserData } from "../../mock/fakeUserData";
// import { fakeUserArtworkData } from "../../mock/fakeUserArtworkData";
import { DashboardMainTab } from "../../components/dashboard/DashboardMainTab";
import { DashboardTabSection } from "./DashboardTabSection";
import { YourVoteTab } from "./YourVoteTab";
import { AccountSettingsTab } from "./AccountSettingsTab";
import { useRouter, useSearchParams } from "next/navigation";
import { useDashboardContext } from "./DashboardContext";
import { DashboardModal } from "./DashboardModal";
import { DeleteArtwork } from "./DeleteArtwork";
import { getAuthStatus, getUserData } from "@/utils/api-user";
import { getSingleArtworkData } from "@/utils/api-artworks";
import { useGlobalContext } from "@/app/GlobalContext";
import { UserDataSchema } from "@/interfaces/user_auth";
import { UserArtworkSchema } from "@/interfaces/artwork_shapes";
import { limiter } from "@/utils/api-rate-limit";
import { DeleteAccount } from "./DeleteAccount";
import { ContestState } from "../../mock/contestState";
import dates from "../../mock/dates";

export default function DashboardManager() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const contestStartTime = new Date(dates.competitionBegin);
  contestStartTime.setHours(12, 0, 0);
  const contestEndTime = new Date(dates.competitionEnd);
  contestEndTime.setHours(23, 59, 59);

  // const now = new Date();

  // Determine the contest state based on today's date
  const contestState: ContestState = ContestState.Active;
  // if (now < contestStartTime) {
  //   contestState = ContestState.Inactive;
  // } else if (now >= contestStartTime && now <= contestEndTime) {
  //   contestState = ContestState.Active;
  // } else if (now > contestEndTime) {
  //   contestState = ContestState.Complete;
  // }

  // This state and function were used to test whether authentication can be verified
  // in its current state. Authentication status should be checked upon login,
  // authenticated page visits, and API requests. We will also need to manage refresh 
  // token tasks manually which will likely occur when authentication status is checked. 
  const [isAuthenticated, setIsAuthenticated] = useState<DashboardAuthenticationStates>("Loading");
  const { handleRealizeSignedOut } = useGlobalContext();

  // Create our dashboard state variable
  const [dashboardTab, setDashboardTab] = useState<DashboardTabs>("Dashboard");
  const [dashboardLoadingState, setDashboardLoadingState] = useState<DashboardLoadingStates>("Loading");
  const {setApiUserData, setApiArtworkData, displayModal} = useDashboardContext();

  useEffect(() => {
    async function asyncGetAuthStatus() {
      const authStatus = await limiter.schedule(() => getAuthStatus());
      if (authStatus.success) {
        setIsAuthenticated("Authenticated");
      } else {
        router.push("/login");
        setIsAuthenticated("Unauthenticated");
      }
      return authStatus.success;
    }
  
    async function asyncGetUserData() {
      try {
        const userDataResponse = await limiter.schedule(() => getUserData());
        if (userDataResponse.success) {
          const userData = userDataResponse.data as UserDataSchema;
          setApiUserData(userData);
        
          if (userData.sk && userData.has_active_submission) {
            const artworkDataResponse = await limiter.schedule(() => getSingleArtworkData(userData.sk));
            if (artworkDataResponse.success) {
              const artworkData = artworkDataResponse.data as UserArtworkSchema;
              setApiArtworkData(artworkData);
            }
          }
        }
      } catch {
        console.log("Error fetching user or artwork data.");
      }
    }

    async function init() {
      try {
        const authStatus = await asyncGetAuthStatus();
        if (authStatus === true) {
          await asyncGetUserData();
          setDashboardLoadingState("Loaded" as DashboardLoadingStates);
        } else {
          handleRealizeSignedOut();
        }
      } catch(error) {
        handleRealizeSignedOut();
        setIsAuthenticated("Unauthenticated");
        setDashboardLoadingState("Loaded" as DashboardLoadingStates);
        router.push("/login");

        console.log(error);
      }
    }
    init();
  }, [setApiUserData, setApiArtworkData]);
  
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
    <div className=" max-w-screen-2xl mx-auto w-full h-full flex-grow mt-4" 
      style={{
        
      }}>
      {displayModal === "deleteModal" && 
        <DashboardModal >
          <DeleteArtwork />
        </DashboardModal>
      }
      {displayModal === "deleteAccount" &&
        <DashboardModal>
          <DeleteAccount />
        </DashboardModal>
      }
      <div className="flex flex-col md:grid md:grid-cols-2 md:px-8 h-full "style={{            gridTemplateColumns: "minmax(260px, 17%) 1fr",
        boxShadow: "inset 0px 5px 10px 0px rgba(0, 0, 0, 0.05)",
        clipPath: "inset(0px 10px)",
        backdropFilter: "blur(15px)"
      }}>
        <DashboardTabSection dashboardTab={dashboardTab} handleTabClick={handleTabClick}/>
        <div className="p-10 h-full">
          <div className="xl:w-[80%] m-auto max-w-[800px]">
            {/* {isAuthenticated && <div>Authenticated!</div>} */}
            {dashboardTab == "Dashboard" && <DashboardMainTab dashboardLoadingState={dashboardLoadingState} isAuthenticated={isAuthenticated} contestState={contestState}/>}
            {dashboardTab == "YourVote" && <YourVoteTab dashboardLoadingState={dashboardLoadingState} isAuthenticated={isAuthenticated}/>}
            {dashboardTab == "AccountSettings" && <AccountSettingsTab dashboardLoadingState={dashboardLoadingState} isAuthenticated={isAuthenticated}/>}
          </div>
        </div>
      </div>
    </div>
  );
}