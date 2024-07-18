import { DashboardLoadingStates } from "../../mock/DashboardTypes";
import { DashboardAuthenticationStates } from "../../mock/DashboardTypes";
import LoadingAnimation from "../svgs/LoadingAnimation";
import { useDashboardContext } from "./DashboardContext";

interface AccountSettingsTabProps {
  dashboardLoadingState: DashboardLoadingStates;
  isAuthenticated: DashboardAuthenticationStates;
}

export const AccountSettingsTab: React.FC<AccountSettingsTabProps> = ({ dashboardLoadingState, isAuthenticated }) => {
  const { apiUserData, setDisplayModal } = useDashboardContext();


  return (
    (dashboardLoadingState == "Loaded" ? 
      (
        <>
          <p className="font-montserrat text-2xl font-regular text-[32px]">Account Settings</p>
          <p className="font-light text-base py-2 pb-4">Change settings related to your account.</p>

          <div className="text-center md:text-left">
            {isAuthenticated && apiUserData?.sk &&
            <button onClick={() => setDisplayModal("deleteAccount")}className="text-center md:text-left my-10 shadow-md m-auto rounded-lg text-white px-4 py-3 bg-red-500 hover:bg-red-600 active:scale-[97%]">Delete your account</button>
            }
          </div>
        </>
      ) : (
        <LoadingAnimation scale={100} stroke={2}/>
      )
    )
  );
};
