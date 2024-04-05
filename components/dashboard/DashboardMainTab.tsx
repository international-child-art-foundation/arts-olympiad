import { DashboardLoadingStates } from "../../mock/DashboardTypes";

interface DashboardMainTabProps {
  dashboardLoadingState: DashboardLoadingStates;
}

export const DashboardMainTab: React.FC<DashboardMainTabProps> = ({ dashboardLoadingState }) => {

  return (
    <div>
      {dashboardLoadingState == DashboardLoadingStates.Loading && 
      <div>
        Loading...
      </div>
      }
      {dashboardLoadingState == DashboardLoadingStates.Loaded && 
      <div>
        Dashboard page loaded.
      </div>
      }
    </div>
  );
};