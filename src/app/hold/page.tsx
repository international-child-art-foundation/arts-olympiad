import { Metadata, NextPage } from "next";
import { sharedOpenGraph } from "@/app/shared-metadata";

interface PageProps {
  params: {
    artworkId: string;
  };
}

export const metadata: Metadata = {
  title: "Under Construction | My Favorite Sport",
  openGraph: {
    ...sharedOpenGraph,
    title: "Under Construction | My Favorite Sport",
  }
};



const underConstructionPage: NextPage<PageProps> = () => {
  return (
    <div className="flex flex-col items-center min-h-[600px] justify-evenly h-screen text-center bg-neutral-white">
      <div className="w-full flex items-left md:pt-10 sm:pl-5 md:pl-10 lg:pl-20">
        <h1 className="text-4xl md:text-6xl font-bold text-left">Great Things Are On The Horizon!</h1>
        <h2 className="text-2xl md:text-4xl font-bold text-left">MyFavoriteSport</h2>
      </div>
      <div className="flex justify-between px-4 py-10 mx-auto w-5/6 md:w-3/5">
        <div className="flex flex-col items-left text-left">
          <p className="text-2xl md:text-4xl font-bold">We're busy at work creating something exciting! Our page is currently under construction, but we promise it will be worth the wait. Here's what you can look forward to:</p>
        </div>
        <div className="bg-yellow-200 rounded-full w-24 h-24 flex items-center justify-center flex-col">
          <button>Take me Home</button>
          <p>votes</p>
        </div>
      </div>
     
    </div>
  );
  
  
};

export default underConstructionPage; 