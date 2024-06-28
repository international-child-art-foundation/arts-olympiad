import { useDashboardContext } from "./DashboardContext";
import LoadingAnimation from "../svgs/LoadingAnimation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { handleDeleteArtwork } from "@/utils/volunteer-artwork-functions";

interface DeleteArtworkProps { // Empty for now
}

export const DeleteArtwork: React.FC<DeleteArtworkProps> = ({  }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { apiUserData, apiArtworkData, setDisplayModal } = useDashboardContext();
  const [successfulArtworkDeletion, setSuccessfulArtworkDeletion] = useState(false);
  const router = useRouter();

  const deleteArtwork = async (artwork_id: string) => {
    setIsLoading(true);
    try {
      const artworkStatus = await handleDeleteArtwork({artwork_id});
      if (artworkStatus?.success == true) {
        console.log(artwork_id + " has been deleted.");
      } else {
        console.log("Failed to delete artwork " + artwork_id);
      }
      setSuccessfulArtworkDeletion(true);
      router.refresh();
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
      {!successfulArtworkDeletion && (
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
                Do you still wish to proceed?
              </p>
            </div>
            <div className={`flex gap-x-9 gap-y-5 w-full flex-col md:flex-row ${isLoading && "pointer-events-none opacity-50"}`}>
              <button className="p-4 text-new-blue outline outline-1 rounded flex-grow"
                onClick={() => setDisplayModal("")}>
                No, go back
              </button>
              <button className="p-4 bg-warning-red text-white rounded flex-grow hover:bg-[#DB3952]"
                onClick={() => deleteArtwork(apiArtworkData.id)}
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
      {successfulArtworkDeletion && 
        <div className="flex items-center justify-center flex-col gap-4">
          <p className="font-montserrat text-4xl">
            Your entry has been removed.
          </p>
          <div className="text-center">
            <p>
              It may take some time for your dashboard to update.
            </p>
            <p>
              Reload the page to see the latest information.
            </p>
          </div>
        </div>
      }
    </div>
  );
};
