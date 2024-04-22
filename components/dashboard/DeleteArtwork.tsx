import { useDashboardContext } from "./DashboardContext";
import { simulateDelay } from "../SimulateDelay";
import LoadingAnimation from "../svgs/LoadingAnimation";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DeleteArtworkProps { // Empty for now
}

export const DeleteArtwork: React.FC<DeleteArtworkProps> = ({  }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { apiUserData, apiArtworkData, userHasActiveSubmission, setDisplayModal } = useDashboardContext();
  const router = useRouter();

  const handleDeleteArtwork = async (artworkId: string) => {
    setIsLoading(true);
    try {
      // API request to delete artwork from database occurs
      // DELETE /users/<userId>/artworks/<artworkId>
      console.log("Deleting: ", artworkId);
      await simulateDelay(100);
      // Reload the page upon completion to display the empty dashboard page.
      router.refresh(); // TODO: Need to set variables as well
      setDisplayModal(false);
    } catch (error) {
      console.log("The artwork could not be deleted from the server.");
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
      {userHasActiveSubmission && (
        apiArtworkData && apiArtworkData.id ? (
          <div className={`max-w-[900px] px-2 sm:px-10 lg:px-20 py-10 flex flex-col gap-6 h-full w-full col-start-1 row-start-1 ${isLoading && "opacity-50"}`}>
            <p className="font-montserrat text-4xl">
              {apiUserData && apiUserData.f_name}, are you sure?
            </p>
            <div className="flex flex-col gap-4 font-light">
              <p>
                By withdrawing, your entry is removed from the competition, and you cannot re-enter.
              </p>
              <p>
                Do you still want to proceed?
              </p>
            </div>
            <div className={`flex gap-x-9 gap-y-5 w-full flex-col md:flex-row ${isLoading && "pointer-events-none opacity-50"}`}>
              <button className="p-4 text-new-blue outline outline-1 rounded flex-grow"
                onClick={() => setDisplayModal(false)}>
                No, go back
              </button>
              <button className="p-4 bg-warning-red text-white rounded flex-grow hover:bg-[#DB3952]"
                onClick={() => handleDeleteArtwork(apiArtworkData.id)}
              >
                Yes, remove my art now
              </button>
            </div>
          </div>
        ) : (
          <div className="my-auto px-8 flex flex-col gap-12">
            <p className="mx-auto font-semibold font-montserrat text-xl mt-auto">Your artwork data could not be found.</p>
          </div>
        )
      )}
    </div>
  );
};
