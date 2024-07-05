import React, { useEffect, useState, memo, useRef } from "react";
import Image from "next/image";
import SocialShare from "../SocialShare";
import Link from "next/link";

// import { artworks } from "../../mock/artworks";
import LoadingAnimation from "../svgs/LoadingAnimation";
import { userArtworkSchema } from "../../mock/userArtworkSchema";
import { artworkDataResponse } from "@/interfaces/gallery_shapes";
import { getSingleArtworkData, voteForArtwork } from "@/utils/artworks";
import { useGlobalContext } from "@/app/GlobalContext";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { gsap } from "gsap";
import "@/styles/home.css";
import { useFilters } from "./FilterContext";

type ArtworkModalProps = {
  artworks: artworkDataResponse
  pageLoadArtwork: userArtworkSchema | undefined;
  sk: string | null;
  isModalOpen: boolean;
  isMobile: boolean;
  currentUserSk: string | null;
  voted: boolean;
  closeModal: () => void;
};

// Define the enum for modal states
type ModalState = 
  | { status: "loading" }
  | { status: "error" }
  | { status: "loaded", data: userArtworkSchema }
  | { status: "submitted" };

function checkSameProps(prevProps: ArtworkModalProps, nextProps: ArtworkModalProps) {
  // We memoize this function to be efficient. If any of `id`, `modalState`, or `pageLoadArtwork` have changed, re-render. 
  // May need to include `artworks` as well.
  return prevProps.sk == nextProps.sk && prevProps.isModalOpen == nextProps.isModalOpen && prevProps.pageLoadArtwork == nextProps.pageLoadArtwork;
}

const ArtworkModal: React.FC<ArtworkModalProps> = ({ artworks, pageLoadArtwork, sk, isModalOpen, closeModal, currentUserSk, isMobile, voted }) => {
  const {isAuthenticated} = useGlobalContext();
  const { windowWidth, windowHeight } = useWindowDimensions();
  const isHorizontal = windowWidth > windowHeight;
  const [modalState, setModalState] = useState<ModalState>({ status: "loading" });
  const [alreadyVoted, setAlreadyVoted] = useState(false);
  const { setVotedSk } = useFilters();

  async function handleCloseModal() {
    await setModalState({status: "loading"});
    setAlreadyVoted(false);
    closeModal();
  }
  
  useEffect(() => {
    if (!isModalOpen || !sk) {
      setModalState({ status: "loading" });
      return;
    }
  
    const fetchArtworkData = async () => {
      let data;
      if (pageLoadArtwork && pageLoadArtwork.sk === sk) {
        data = pageLoadArtwork;
      } else if (artworks) {
        data = artworks.find(artwork => artwork.sk === sk);
      }
  
      if (!data && sk) {
        try {
          const singleArtworkResponse = await getSingleArtworkData(sk);
          data = singleArtworkResponse.data;
        } catch (error) {
          console.error("Error fetching artwork data:", error);
          setModalState({ status: "error" });
          return;
        }
      }
  
      if (data) {
        setModalState({ status: "loaded", data });
        let delay;
        if (isMobile) {
          delay = "-=0.4";
        } else {
          delay = "-=0.1";
        }
        const timeline = gsap.timeline();
        timeline
          .set(modalContentRef.current, { opacity: 0 })
          // .set(gridContainerRef.current, { gridTemplateRows: "0.7fr" })
          .to(gridContainerRef.current, { 
            gridTemplateRows: "1fr", 
            duration: isMobile ? 0.7 : 0.4, 
            ease: isMobile ? "power1.out": "power4.out" 
          })
          .to(modalContentRef.current, { 
            opacity: 1, 
            duration: 0.2, 
            ease: "power4.out" 
          }, delay); // Start slightly before the grid animation ends  
      } else {
        setModalState({ status: "error" });
      }
    };
  
    fetchArtworkData();
  }, [isModalOpen, sk, pageLoadArtwork, artworks]);


  const submitVote = async (artwork_sk: string) => {
    if (modalState.status == "loaded") {
      const currentData = modalState.data;
      setModalState({status: "loading"}); // Transition to loading state
      try {
        const response = await voteForArtwork(artwork_sk);
        if (response.success === true) {
          setModalState({status: "submitted"}); // Transition to submitted state on success
          setVotedSk(artwork_sk);
        } else {
          if (response.message == "Cannot vote on the same artwork twice") {
            setModalState({status: "loaded", data: currentData});
            setAlreadyVoted(true);
          } else {
            setModalState({status: "error"});
          }
        }
      } catch (error) {
        console.error("Failed to submit vote", error);
      }
    }
  };

  const modalContentRef = useRef(null);
  const modalWrapperRef = useRef(null);
  const gridContainerRef = useRef(null);

  useEffect(() => {
    if (modalState.status == "loaded" && modalState.data) {
    }
  }, [modalState]);

  if (!isModalOpen) return null;

  function renderLoadingState() {
    return (
      <div className="relative inset-0 flex justify-center items-center pointer-events-none h-[100px]">
        <LoadingAnimation scale={90} stroke={2}/>
      </div>
    );
  }
  
  function renderSubmittedState() {
    return (
      <div className="flex flex-col overflow-auto no-scrollbar items-center justify-center h-full w-[410px] max-w-full mx-auto">
        <p className="font-montserrat font-semibold text-3xl pb-7">Thank you for your vote.</p>
        <p className="text-xl pb-10 font-light">Your vote is cast – thank you for participating! You've just helped an artist get one step closer to the spotlight. Share their work to spread the word!</p>
        <div className="">
          <p className="font-semibold text-xl text-center">Share this post</p>
          {sk && 
            <SocialShare shareId={sk} />
          }
        </div>

        <button className="bg-new-blue w-full text-base text-white text-base p-4 rounded mt-6 cursor-pointer" onClick={handleCloseModal}>Return to Gallery</button>
      </div>
    );
  }
  
  function renderDefaultState() {
    if (modalState.status != "loaded" || sk == null) {
      return (
        <>
          <p className="mx-auto font-semibold font-montserrat text-xl mt-auto">Oops! An error has occurred. This artwork may be unavailable.</p>
          <p className="mx-auto py-4 text-slate-400">error: artworkData not found.</p>
          <p className="mx-auto py-4 mt-auto text-xl">If this error persists, please let us know.</p>
          <button className="bg-new-blue w-[200px] text-base text-white text-base p-2 rounded mt-4 mx-auto" onClick={handleCloseModal}>Contact Us</button>
        </>
      );
    }  
    return (
      <div className="grid grid-cols-2 gap-5 md:gap-10 grid-rows-1 overflow-hidden max-h-full mx-auto px-6">
        <div className="flex flex-col overflow-auto no-scrollbar">
          <div className="inline-block py-2">
            <span className="bg-[#fbb22e] rounded-3xl p-2 px-8">
              {modalState.data.votes} {modalState.data.votes == 1 ? "Vote" : "Votes"}
            </span>
          </div>
          <p className="font-bold text-xl mt-5">{modalState.data.f_name}</p>
          <div className="mt-5">
            <p>{modalState.data.age} | {modalState.data.location}</p>
            <p className="mt-2">{modalState.data.sport}</p>
          </div>
          <p className="italic mt-10">{modalState.data.description}</p>
          {modalState.data.is_ai_gen && (
            <div className="mt-5">
              <p>* This image was created using AI</p>
              <p>Source: {modalState.data.model}</p>
              <p>Prompt: {modalState.data.prompt}</p>
            </div>
          )}
          <div className="mt-auto">
            <p className="font-semibold text-xl pt-4">Share this post</p>
            <SocialShare shareId={sk} />
          </div>
          {!isAuthenticated ? (
            <>
              <p className="text-sm text-new-blue mt-4">Ready to vote for this artwork? Please sign in or create an account to participate.</p>
              <Link className="bg-new-blue text-white text-base p-4 rounded mt-4 text-center" href="/auth/login">Sign in</Link>
            </>
          ) : (
            currentUserSk != sk && (
              <>
                {alreadyVoted && <p className="text-md pt-4 text-green-700">You've already voted for this artwork!</p>}
                {voted ? (
                  <button className={"bg-green-600 text-white text-base p-4 rounded mt-4 opacity-60 pointer-events-none"} onClick={() => submitVote(sk)}>Thanks for your vote!</button>
                ) : (
                  <button className={`bg-new-blue text-white text-base p-4 rounded mt-4 ${alreadyVoted && "opacity-60 pointer-events-none"}`} onClick={() => submitVote(sk)}>Vote for this artwork</button>
                )}
              </>
            )
          )}
        </div>
        <div className="flex justify-center items-center rounded-xl overflow-hidden relative flex-shrink">
          <Image src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_DISTRIBUTION_URL}/${modalState.data.sk}/medium.webp`} alt={modalState.data.f_name} width={800} height={500} className="max-w-full max-h-full col-start-2 z-20 object-contain" />
          <Image src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_DISTRIBUTION_URL}/${modalState.data.sk}/medium.webp`} fill alt={modalState.data.f_name} className="col-start-2 z-10 rounded-xl blur-3xl opacity-50 object-cover" />
        </div>
      </div>
    );
  }

  // Mobile rendering for the loading state
  function renderLoadingStateMobile() {
    return (
      <div className="relative inset-0 flex justify-center items-center pointer-events-none h-[0px]">
        <LoadingAnimation scale={90} stroke={2}/>
      </div>
    );
  }
  
  function renderErrorState() {
    return (
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <p>Something went wrong. It may help to reload the page.</p>
      </div>
    );
  }

  // Mobile rendering for the default state
  function renderDefaultStateMobile() {
    if (modalState.status != "loaded") {
      return (
        <>
          <p className="mx-auto font-semibold font-montserrat text-xl mt-auto">Oops! An error has occurred. This artwork may be unavailable.</p>
          <p className="mx-auto py-4 text-slate-400">error: artworkData not found.</p>
          <p className="mx-auto py-4 mt-auto text-xl">If this error persists, please let us know.</p>
          <button className="bg-new-blue w-[200px] text-base text-white text-base p-2 rounded mt-4 mx-auto" onClick={handleCloseModal}>Contact Us</button>
        </>
      );
    }  
    return (
      <div className="grid max-h-full p-4 overflow-auto gap-y-2">
        <div className="inline-block py-2 mb-4">
          <span className="bg-[#fbb22e] rounded-3xl p-2 px-8">
            {modalState.data.votes} {modalState.data.votes == 1 ? "Vote" : "Votes"}
          </span>
        </div>
        <div className="flex justify-center items-center rounded-xl overflow-hidden relative flex-shrink">
          <Image src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_DISTRIBUTION_URL}/${modalState.data.sk}/medium.webp`} alt={modalState.data.f_name} width={500} height={300} className="max-w-full max-h-full col-start-2 z-20 object-contain" />
          <Image src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_DISTRIBUTION_URL}/${modalState.data.sk}/medium.webp`} fill alt={modalState.data.f_name} className="col-start-2 z-10 rounded-xl blur-3xl opacity-50 object-cover" />
        </div>
        <p className="font-bold text-xl mt-9">{modalState.data.f_name}</p>
        <div className="mt-2">
          <p>{modalState.data.age} | {modalState.data.location}</p>
          <p className="">{modalState.data.sport}</p>
        </div>
        {modalState.data.is_ai_gen && (
          <div className="mt-5">
            <p>* This image was created using AI</p>
            <p>Source: {modalState.data.model}</p>
            <p>Prompt: {modalState.data.prompt}</p>
          </div>
        )}
        <div className="mt-auto">
          <p className="font-semibold text-xl">Share this post</p>
          {sk && <SocialShare shareId={sk} />}
        </div>
        {!isAuthenticated ? (
          <>
            <p className="text-sm text-new-blue mt-4">Ready to vote for this artwork? Please sign in or create an account to participate.</p>
            <Link className="bg-new-blue text-white text-base p-4 rounded mt-4 text-center" href="/auth/login">Sign in</Link>
          </>
        ) : (
          currentUserSk != sk && sk && (
            <>
              {alreadyVoted && <p className="text-md pt-4 text-green-700">You've already voted for this artwork!</p>}
              <button className={`bg-new-blue text-white text-base p-4 rounded mt-4 ${alreadyVoted && "opacity-60 pointer-events-none"}`} onClick={() => submitVote(sk)}>Vote for this artwork</button>
            </>
          )
        )}
      </div>
    );
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  function renderContent() {
    switch (modalState.status) {
    case "loading":
      return isHorizontal ? renderLoadingState() : renderLoadingStateMobile();
    case "error":
      return renderErrorState();
    case "submitted":
      return renderSubmittedState();
    case "loaded":
      return isHorizontal ? renderDefaultState() : renderDefaultStateMobile();
    }
  }
    
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center h-auto" onClick={handleClick}>
      <div ref={modalWrapperRef} className={`max-h-[93%] bg-white rounded-3xl ${isHorizontal ? "w-[80%] max-w-[1100px]" : "w-[480px] max-w-[95%]"} flex flex-col relative overflow-hidden`}>
        <span onClick={handleCloseModal} className="absolute top-0 right-0 text-5xl font-light p-4 cursor-pointer active:scale-90">&times;</span>
        <div ref={gridContainerRef} className="grid overflow-scroll no-scrollbar " style={{gridTemplateRows:"0.2fr"}}>
          <div ref={modalContentRef} className={`min-h-[200px] ${isHorizontal ? "p-16" : "p-8"}`}>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ArtworkModal, checkSameProps);
