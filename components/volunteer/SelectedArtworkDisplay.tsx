import Image from "next/image";
import { UserArtworkSchema } from "@/interfaces/artwork_shapes";
import { useState, useCallback } from "react";

interface SelectedArtworkDisplayProps {
  selectedArtwork: UserArtworkSchema;
  setSelectedArtwork: React.Dispatch<React.SetStateAction<UserArtworkSchema | null>>;
  apiError: string;
  onApprove: (artworkSk: string) => Promise<void>;
  onDeny: (artworkSk: string) => Promise<void>;
  onBanUser: (userSk: string) => void;
  onRefundUser: (userSk: string) => void;
}

type ChecklistItem = "noHiddenContent" | "noInappropriateContent" | "noManipulation" | "normalMetadata";

type ChecklistState = {
  [K in ChecklistItem]: boolean | null;
};

export const SelectedArtworkDisplay: React.FC<SelectedArtworkDisplayProps> = ({
  selectedArtwork,
  setSelectedArtwork,
  onApprove,
  onDeny,
  onBanUser,
  apiError,
  onRefundUser
}) => {
  const [checklistItems, setChecklistItems] = useState<ChecklistState>({
    noHiddenContent: null,
    noInappropriateContent: null,
    noManipulation: null,
    normalMetadata: null
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChecklistChange = (key: ChecklistItem) => {
    setChecklistItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const isAllGreen = useCallback(() => {
    return Object.values(checklistItems).every(value => value === true);
  }, [checklistItems]);

  const hasRed = useCallback(() => {
    return Object.values(checklistItems).some(value => value === false);
  }, [checklistItems]);

  const handleApprove = async () => {
    setIsLoading(true);
    if (isAllGreen()) {
      await onApprove(selectedArtwork.sk);
    } else {
      alert("All checklist items must be green to approve the artwork.");
    }
    setIsLoading(false);
  };

  const handleDeny = async () => {
    setIsLoading(true);
    if (hasRed()) {
      await onDeny(selectedArtwork.sk);
    } else {
      alert("At least one checklist item must be red to deny the artwork.");
    }
    setIsLoading(false);
  };

  const handleBanUser = async () => {
    setIsLoading(true);
    if (hasRed()) {
      await onBanUser(selectedArtwork.sk);
    } else {
      alert("At least one checklist item must be red to ban the user.");
    }
    setIsLoading(false);
  };

  const handleRefundUser = async () => {
    setIsLoading(true);
    await onRefundUser(selectedArtwork.sk);
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{selectedArtwork.f_name}</h2>
          <button 
            onClick={() => setSelectedArtwork(null)}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="mb-4">
          <Image 
            src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_DISTRIBUTION_URL}/${selectedArtwork.sk}/initial.${selectedArtwork.file_type}`} 
            width={500}
            height={500}
            objectFit="contain"
            alt={`Artwork titled: ${selectedArtwork.f_name}`} 
            className="w-full h-auto"
          />
        </div>
        
        <div className="space-y-2">
          <p><strong>Description:</strong> {selectedArtwork.description}</p>
          <p><strong>Artist:</strong> {selectedArtwork.f_name}</p>
          <p><strong>Location:</strong> {selectedArtwork.location}</p>
          <p><strong>Category:</strong> {selectedArtwork.sport}</p>
          <p><strong>File Type:</strong> {selectedArtwork.file_type}</p>
          <p><strong>SK:</strong> {selectedArtwork.sk}</p>
        </div>
        

        <div className="mt-4">
          {apiError && 
          <>
            <p className="text-red-500">An API error has occurred. A refund may have been rejected, you may be offline, the server may be down, or you may have reached your rate limit.</p>
            <p className="text-red-500">Please contact an administrator if this keeps unexpectedly happening.</p>
          </>
          }
          <h3 className="text-lg font-semibold mb-2">Review Checklist:</h3>
          <ul className="space-y-2">
            {(Object.entries(checklistItems) as [ChecklistItem, boolean | null][]).map(([key, value]) => (
              <li key={key} className="flex items-center">
                <button
                  onClick={() => handleChecklistChange(key)}
                  className={`flex-grow text-left p-2 rounded ${
                    value === null ? "bg-gray-200" :
                      value ? "bg-green-200" : "bg-red-200"
                  }`}
                >
                  {key === "noHiddenContent" && "No hidden text or patterns"}
                  {key === "noInappropriateContent" && "No inappropriate content"}
                  {key === "noManipulation" && "No signs of manipulation"}
                  {key === "normalMetadata" && "Metadata appears normal"}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className={`${isLoading && "opacity-60 pointer-events-none select-none disabled" } mt-6 flex justify-end space-x-4`}>
          <button 
            onClick={handleApprove}
            className={`px-4 py-2 rounded-lg text-white ${isAllGreen() ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"} transition-colors`}
            disabled={!isAllGreen()}
          >
            Approve
          </button>
          <button 
            onClick={handleDeny}
            className={`px-4 py-2 rounded-lg text-white ${hasRed() ? "bg-red-500 hover:bg-red-600" : "bg-gray-400 cursor-not-allowed"} transition-colors`}
            disabled={!hasRed()}
          >
            Deny
          </button>
          <button 
            onClick={handleRefundUser}
            className="bg-orange-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Refund user
          </button>
          <button 
            onClick={handleBanUser}
            className={`px-4 py-2 rounded-lg text-white ${hasRed() ? "bg-yellow-500 hover:bg-yellow-600" : "bg-gray-400 cursor-not-allowed"} transition-colors`}
            disabled={!hasRed()}
          >
            Ban User
          </button>
        </div>
      </div>
    </div>
  );
};