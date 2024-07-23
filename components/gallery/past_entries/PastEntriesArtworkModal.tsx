import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { artworks } from "./past-artworks";
import LoadingAnimation from "../../svgs/LoadingAnimation";

type ArtworkModalProps = {
  id: string;
  modalState: boolean;
  isMobile: boolean;
  isHorizontal: boolean;
  closeModal: () => void;
  getShareUrl: () => string;
};

type Artwork = {
  id: string;
  name: string;
  votes: number;
  url: string;
  country: string[];
  age: number;
  uploadAt: string;
  alt: string;
  sport: string[];
  aiGenerated: boolean;
  aiSource: string;
  aiPrompt: string;
};

// Define the enum for modal states
enum ModalState {
  Default,
  Loading,
  Submitted,
}

const ArtworkModal: React.FC<ArtworkModalProps> = ({ id, modalState, isHorizontal, closeModal }) => {
  const [artworkData, setArtworkData] = useState<Artwork | undefined>(undefined);
  const [currentState, setCurrentState] = useState<ModalState>(ModalState.Default);

  {/* Placeholder artwork data retrieval; will be replaced by API call with possibly different returned object */}
  useEffect(() => {
    const data = artworks.find(artwork => artwork.id == id);
    setArtworkData(data);
    setCurrentState(ModalState.Default); // Reset to default state when modal is opened or the artwork changes
  }, [id, modalState]);

  if (!modalState) return null;

  function renderLoadingState() {
    return (
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <LoadingAnimation scale={90} stroke={2}/>
      </div>
    );
  }
  
  function renderSubmittedState() {
    return (
      <div className="flex flex-col overflow-auto items-center justify-center h-full w-[410px] max-w-full mx-auto">
        <p className="font-montserrat font-semibold text-3xl pb-7">Thank you for your vote.</p>
        <p className="text-xl pb-10 font-light">Your vote is cast – thank you for participating!  You've just helped an artist get one step closer to the spotlight. Share their work to spread the word!</p>

        <button className="bg-new-blue w-full text-base text-white text-base p-4 rounded mt-6 cursor-pointer" onClick={closeModal}>Return to Gallery</button>
      </div>
    );
  }
  
  function renderDefaultState() {
    if (!artworkData) {
      return (
        <>
          <p className="mx-auto font-semibold font-montserrat text-xl mt-auto">Oops! An error has occurred. This artwork may be unavailable.</p>
          <p className="mx-auto py-4 text-slate-400">error: artworkData not found.</p>
          <p className="mx-auto py-4 mt-auto text-xl">If this error persists, please let us know.</p>
          <button className="bg-new-blue w-[200px] text-base text-white text-base p-2 rounded mt-4 mx-auto" onClick={closeModal}>Contact Us</button>
        </>
      );
    }  
    return (
      <div className="grid grid-cols-2 gap-5 md:gap-10 grid-rows-1 overflow-hidden max-h-full mx-auto px-6">
        <div className="flex flex-col overflow-auto justify-between">

          <p className="font-bold text-xl mt-5">{artworkData.name}</p>
          <div className="mt-5">
            <p>{artworkData.age} | {artworkData.country.join(", ")}</p>
            <p className="mt-2">{artworkData.sport.join(" | ")}</p>
          </div>
          {artworkData.aiGenerated && (
            <div className="mt-5">
              <p>* This image was created using AI</p>
              <p>Source: {artworkData.aiSource}</p>
              <p>Prompt: {artworkData.aiPrompt}</p>
            </div>
          )}
          <div className="w-full flex flex-col">
            <p className="text-sm text-new-blue mt-4">This artwork was submitted in the past and cannot be voted upon.</p>
            <Link className="bg-new-blue text-white text-base p-4 rounded mt-4 text-center" href="/gallery">View our gallery of active entries</Link>
          </div>
        </div>
        <div className="flex justify-center items-center rounded-xl overflow-hidden relative flex-shrink">
          <Image src={artworkData.url} alt={artworkData.alt} width={500} height={300} className="max-w-full max-h-full col-start-2 z-20 object-contain" />
          <Image src={artworkData.url} objectFit="cover" layout="fill" alt={artworkData.alt} className="col-start-2 z-10 rounded-xl blur-3xl opacity-50" />
        </div>
      </div>
    );
  }

  // Mobile rendering for the loading state
  function renderLoadingStateMobile() {
    return (
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <LoadingAnimation scale={90} stroke={2}/>
      </div>
    );
  }
  // Mobile rendering for the default state
  function renderDefaultStateMobile() {
    if (!artworkData) {
      return (
        <>
          <p className="mx-auto font-semibold font-montserrat text-xl mt-auto">Oops! An error has occurred. This artwork may be unavailable.</p>
          <p className="mx-auto py-4 text-slate-400">error: artworkData not found.</p>
          <p className="mx-auto py-4 mt-auto text-xl">If this error persists, please let us know.</p>
          <button className="bg-new-blue w-[200px] text-base text-white text-base p-2 rounded mt-4 mx-auto" onClick={closeModal}>Contact Us</button>
        </>
      );
    }  
    return (
      <div className="grid max-h-full overflow-auto gap-y-2">
        <div className="inline-block py-2 mb-4">
          <span className="bg-[#fbb22e] rounded-3xl p-2 px-8">
            {artworkData.votes} {artworkData.votes == 1 ? "Vote" : "Votes"}
          </span>
        </div>
        <div className="flex justify-center items-center rounded-xl overflow-hidden relative flex-shrink">
          <Image src={artworkData.url} alt={artworkData.alt} width={500} height={300} className="max-w-full max-h-full col-start-2 z-20 object-contain" />
          <Image src={artworkData.url} objectFit="cover" layout="fill" alt={artworkData.alt} className="col-start-2 z-10 rounded-xl blur-3xl opacity-50" />
        </div>
        <p className="font-bold text-xl mt-9">{artworkData.name}</p>
        <div className="mt-2">
          <p>{artworkData.age} | {artworkData.country.join(", ")}</p>
          <p className="">{artworkData.sport.join(" | ")}</p>
        </div>
        {artworkData.aiGenerated && (
          <div className="mt-5">
            <p>* This image was created using AI</p>
            <p>Source: {artworkData.aiSource}</p>
            <p>Prompt: {artworkData.aiPrompt}</p>
          </div>
        )}
        <div className="w-full flex flex-col">
          <p className="text-sm text-new-blue mt-4">This artwork was submitted in the past and cannot be voted upon.</p>
          <Link className="bg-new-blue text-white text-base p-4 rounded mt-4 text-center" href="/gallery">View our gallery of active entries</Link>
        </div>
      </div>
    );
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
    
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center h-auto"
      onClick={handleClick} 
    >
      <div className={`bg-white rounded-3xl ${isHorizontal ? "w-[80%] max-w-[1100px] p-16" : "w-[480px] p-8 max-w-[95%]"} min-h-[400px] max-h-full flex flex-col relative overflow-hidden`}>
        <span onClick={closeModal} className="absolute top-0 right-0 text-5xl font-light p-4 cursor-pointer active:scale-90">&times;</span>
        {currentState === ModalState.Loading && (isHorizontal ? renderLoadingState() : renderLoadingStateMobile())}
        {currentState === ModalState.Submitted && renderSubmittedState()}
        {currentState === ModalState.Default && (isHorizontal ? artworkData && renderDefaultState() : renderDefaultStateMobile())}
      </div>
    </div>
  );
};

export default ArtworkModal;