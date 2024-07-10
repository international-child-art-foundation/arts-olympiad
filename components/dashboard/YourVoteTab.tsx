import { DashboardLoadingStates, DashboardAuthenticationStates } from "../../mock/DashboardTypes";
import { VotedArtDisplay } from "./VotedArtDisplay";
import { useDashboardContext } from "./DashboardContext";
import Link from "next/link";
import { getSingleArtworkData } from "@/utils/api-artworks";
import { useCallback, useEffect } from "react";
import { limiter } from "@/utils/api-rate-limit";
import { UserArtworkSchema } from "@/interfaces/artwork_shapes";

interface YourVoteTabProps {
  dashboardLoadingState: DashboardLoadingStates;
  isAuthenticated: DashboardAuthenticationStates;
}

export const YourVoteTab: React.FC<YourVoteTabProps> = ({ dashboardLoadingState, isAuthenticated }) => {

  const { apiUserData, apiArtworkVoteData, setApiArtworkVoteData } = useDashboardContext();

  const handleGetVotedArtworkData = useCallback(async () => {
    console.log(apiUserData);
    if (apiUserData && apiUserData.voted_sk) {
      const singleArtworkData = await limiter.schedule(() => getSingleArtworkData(apiUserData.voted_sk));
      console.log(singleArtworkData);
      if (singleArtworkData.success == true && singleArtworkData.data) {
        setApiArtworkVoteData(singleArtworkData.data as UserArtworkSchema);
      }
    }
  }, [apiUserData, setApiArtworkVoteData]);

  useEffect(() => {
    handleGetVotedArtworkData();

  }, [handleGetVotedArtworkData]);

  return (
    <div>
      {isAuthenticated == "Unauthenticated" &&
          <>
            <div>You're not logged in!</div>
            <Link href="/auth/login">Return to login page</Link>
          </>
      }
      {isAuthenticated == "Authenticated" && dashboardLoadingState == "Loading" && 
      <div>
        Loading the Your Vote page...
      </div>
      }
      {dashboardLoadingState == "Loaded" && isAuthenticated == "Authenticated" && 
      <div>
        <p className="font-montserrat text-2xl font-regular text-[32px] my-3 mb-8"> Your Vote </p>
        {apiArtworkVoteData && apiArtworkVoteData.sk ?
          <VotedArtDisplay/>
          :
          <div className="my-10">
            <p>Your voted-upon artwork will appear here.</p>
            <p>Visit the <Link href="/gallery" className="text-blue-500 visited:text-purple-600"> Gallery page </Link> to vote for your favorite artwork!</p>
          </div>
        }
      </div>
      }
    </div>
  );
};