import { useDashboardContext } from "./DashboardContext";
import LoadingAnimation from "../svgs/LoadingAnimation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { handleUserDeleteAccount } from "@/utils/api-user";
import { limiter } from "@/utils/api-rate-limit";
import { useGlobalContext } from "@/app/GlobalContext";

interface DeleteAccountProps {} // Empty for now

export const DeleteAccount: React.FC<DeleteAccountProps> = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { apiUserData, setDisplayModal } = useDashboardContext();
  const [successfulAccountDeletion, setSuccessfulAccountDeletion] = useState(false);
  const [deletionError, setDeletionError] = useState<string | null>(null);
  const router = useRouter();
  const { handleRealizeSignedOut } = useGlobalContext();


  const deleteAccount = async () => {
    setIsLoading(true);
    setDeletionError(null);
    try {
      const deletionStatus = await limiter.schedule(() => handleUserDeleteAccount());
      if (deletionStatus.success === true) {
        
        console.log("Account with ID " + apiUserData?.sk + " has been deleted ");
        setSuccessfulAccountDeletion(true);
        handleRealizeSignedOut();
        setTimeout(() => router.push("/"), 3000); // Redirect after 3 seconds
      } else {
        setDeletionError("Our deletion process has encountered an error. Please contact support.");
      }
    } catch (error) {
      setDeletionError("An unexpected error occurred. Please try again or contact support.");
      console.error("Error deleting account:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="grid">
      {isLoading && 
        <div className="col-start-1 row-start-1">
          <LoadingAnimation scale={100} stroke={2} />
        </div>
      }
      {!successfulAccountDeletion && (
        <div className={`max-w-[900px] px-2 sm:px-10 lg:px-20 py-10 flex flex-col justify-between gap-6 h-full w-full col-start-1 row-start-1 mx-auto ${isLoading && "opacity-50"}`}>
          <p className="font-montserrat text-4xl">
            {apiUserData && apiUserData.f_name ? `${apiUserData.f_name}, are you sure?` : "Are you sure?"}
          </p>
          <div className="flex flex-col gap-4 font-light">
            <p>
              Deleting your account will prevent you from re-entering the competition.
            </p>
            <p>
              This action cannot be undone. Do you still wish to proceed?
            </p>
          </div>
          <div className={`flex gap-x-9 gap-y-5 w-full flex-col md:flex-row ${isLoading && "pointer-events-none opacity-50"}`}>
            <button className="p-4 text-new-blue outline outline-1 rounded flex-grow"
              onClick={() => setDisplayModal("")}>
              No, go back
            </button>
            <button className="p-4 bg-red-500 hover:bg-red-600 text-white rounded flex-grow"
              onClick={deleteAccount}
            >
              Yes, delete my account
            </button>
          </div>
          {deletionError && <p className="text-warning-red">{deletionError}</p>}
        </div>
      )}
      {successfulAccountDeletion && 
        <div className="flex items-center justify-center flex-col gap-4">
          <p className="font-montserrat text-4xl">
            Your account has been successfully deleted.
          </p>
          <div className="text-center">
            <p>
              We're sorry to see you go.
            </p>
            <p>
              You will be redirected to the homepage in a few seconds.
            </p>
          </div>
        </div>
      }
    </div>
  );
};