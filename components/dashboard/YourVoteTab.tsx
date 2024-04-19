import { DashboardLoadingStates } from "../../mock/DashboardTypes";

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
        Your Vote page loaded.
      </div>
      }
    </div>
  );
};