import { DashboardLoadingStates } from "../../mock/DashboardTypes";
import { VotedArtDisplay } from "./VotedArtDisplay";

interface YourVoteTabProps {
  dashboardLoadingState: DashboardLoadingStates;
}

export const YourVoteTab: React.FC<YourVoteTabProps> = ({ dashboardLoadingState }) => {

  return (
    <div>
      {dashboardLoadingState == "Loading" && 
      <div>
        Loading the Your Vote page...
      </div>
      }
      {dashboardLoadingState == "Loaded" && 
      <div>
        <p className="font-montserrat text-2xl font-regular text-[32px] my-3 mb-8"> Your Vote </p>
        <VotedArtDisplay/>
      </div>
      }
    </div>
  );
};