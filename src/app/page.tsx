import bannerImage from "../../public/banner-image.png";
import Image from "next/image";
import ContentContainer from "../../components/ui/ContentContainer";
import Button from "../../components/ui/Button";

export default function Home() {
  return (
    <main className="grid grid-cols-1 gap-4 md:grid-cols-10 bg-neutral-white">
      {/* banner block */}
      <div className="bg-neutral-white col-span-1 md:col-span-6 aspect-w-16 aspect-h-9 relative">
        <Image 
          width={1500}
          height={850}
          src={bannerImage}
          alt="banner-image.png"
          // fill={true}
          style={{objectFit: "fill"}}
        />
      </div>
      {/* <div className="bg-neutral-white relative md:col-span-6">
        <img 
          src="/banner-image.png"
          alt="banner-image.png"
          className="w-full "
          style={{objectFit: "fill"}}
        />
      </div> */}

      <div className="bg-neutral-white md:col-span-4 ">
        <div className="break-words font-semibold text-4xl pl-6 md:pl-20 pt-5 md:pt-20">
          My Favorite Sport 
        </div>
        <div className="break-words text-base pl-6 md:pl-20 pt-7 md:pt-10 pr-6 md:pr-20">
          To celebrate their Creativity, Diversity, and Unity, schoolchildren everywhere can participate in a global art contest on the theme, My Favorite Sport, and rally the votes to win the gold!
        </div>
        <div className="break-words text-base pl-6 md:pl-20 pt-7 md:pt-10 pr-6 md:pr-20">
          The contest will start from Paris at the Arts Olympiad exhibition in March 2024.
        </div>
        <div className="break-words text-base pl-6 md:pl-20 pt-7 md:pt-10 pr-6 md:pr-20 pb-16">
          The contest will end in Washington, D.C. when the winners are announced at the World Children's Festival on July 1, 2024.
        </div>
      </div>

      <div className="bg-yellow-300 md:col-span-10 grid md:grid-cols-2 grid-cols-1">
        {/* artist upload block */}
        <div className="bg-neutral-white col-span-1 rounded-2xl p-10 shadow-md flex flex-col items-center mt-10 mr-10 ml-10 mb-10">
          <div className="break-words font-semibold text-4xl pl-6 pt-2">
            I am an Artist
          </div>
          <div className="break-words text-xl pt-2">
            10- to 20-year old
          </div>
          <Image 
            src="/home/artist.png" 
            width = {224}
            height = {224}
            className="w-1/2 h-full pt-12" 
            alt="artst.png" 
          />
          <div className="break-words text-center text-xl pt-8 pb-8">
            Create / Upload / Share your masterpiece to get the votes to win the gold!
          </div>
          <Button link="/upload" mainButton nonNav>Upload</Button>
          <div className="break-words text-center text-xl pt-8 pb-8">
            Upload today and Share your work for maximum votes.
          </div>
          <hr className="w-full border-t-2 border-gray-500 mx-4" />
          <div className="break-words text-center text-xl pt-8 pb-8">
            Upload Deadline is June 29, 2024
          </div>
        </div>
        {/* voter block */}
        <div className="bg-neutral-white col-span-1 rounded-2xl p-10 shadow-md flex flex-col items-center mt-10 mr-10 ml-10 mb-10">
          <div className="break-words font-semibold text-4xl pl-6 pt-2">
            I want to be a Judge
          </div>
          <div className="break-words text-xl pt-2">
            10 or older
          </div>
          <Image 
            src="/home/judge.png" 
            width = {124}
            height = {168}
            className="h-1/2 w-auto pt-12" 
            alt="judge.png" 
          />
          <div className="break-words text-center text-xl pt-8 pb-8">
            Vote For Your Favorite Artwork.
          </div>
          <Button link="/vote" mainButton nonNav>Vote</Button>
          <div className="break-words text-center text-xl pt-8 pb-8">
            You can vote only once,so Share with friends.
          </div>
          <hr className="w-full border-t-2 border-gray-500 mx-4" />
          <div className="break-words text-center text-xl pt-8 pb-8">
            Upload Deadline is June 29, 2024
          </div>
        </div>
      </div>
      {/* gallery search block */}
      <div className="bg-neutral-white col-span-1 md:col-span-10 flex flex-col items-center mt-10 mr-10 ml-10 mb-10">
        <div className="break-words font-semibold text-4xl">
          #MyFavoriteSport
        </div>
        <div className="break-words text-center text-xl pt-8 pb-8">
          Search the gallery for amazing works from around the world.
        </div>
        <Image 
          src="/home/swim.png" 
          width = {386}
          height = {244}
          className="h-auto sm:w-2/5 w-4/5 pt-10" 
          alt="swim.png" 
        />
        <Button link="/gallery" mainButton nonNav>Explore</Button>
      </div>
      {/* 2024 arts olympiad introduction */}
      {/* - logo and text - */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-12 bg-secondary-blue col-span-1 md:col-span-10 mb-10">
        <Image 
            src="/home/torch-logo.png" 
            width = {151}
            height = {139}
            className="md:mt-16 md:ml-20 md:mb-10 md:col-span-2 col-span-1 justify-self-left mt-5 ml-5 mb-5" 
            alt="torch-logo.png" 
          />
        <div className="text-left text-xl ml-5 md:mt-36 md:mb-10 break-words md:col-span-4">
            An interactive exhibition in Paris to celebrate Creativity, Diversity, and Unity.
        </div>
        <div className="hidden md:block md:col-span-6"></div>
        <div className="hidden md:block md:col-span-1"></div>
        <div className="md:col-span-3 bg-neutral-white md:rounded-2xl p-10 shadow-md flex flex-col items-center md:ml-20 ml-5 mr-5">
          <Image 
            src="/home/icon-1.png" 
            width = {86}
            height = {86}
            className="w-3/7 h-full mt-3" 
            alt="icon-1.png" 
          />
          <div className="break-words text-base text-center pt-7">
            Visitors ages 10 to 20 Create, Upload, and Share their masterpieces to win the Gold!
          </div>
        </div>
        <div className="md:col-span-3 bg-neutral-white rounded-2xl p-10 shadow-md flex flex-col items-center ml-10 mr-10">
          <Image 
              src="/home/icon-2.png" 
              width = {86}
              height = {86}
              className="w-3/7 h-auto mt-3" 
              alt="icon-2.png" 
            />
            <div className="break-words text-base text-center pt-10">
              Visitors vote for their favorite artwork.
            </div>
        </div>
        <div className="md:col-span-3 bg-neutral-white rounded-2xl p-10 shadow-md flex flex-col items-center mr-20">
          <Image 
            src="/home/icon-3.png" 
            width = {86}
            height = {86}
            className="w-3/7 h-auto mt-3" 
            alt="icon-3.png" 
          />
          <div className="break-words text-base text-center pt-10">
            #MyFavoriteSport contest will spread across Europe and the world from Paris.
          </div>
        </div>
        <div className="hidden md:block md:col-span-2"></div>
        <div className="hidden md:block md:col-span-3"></div>
        <div className="md:col-span-3 bg-neutral-white rounded-2xl p-10 shadow-md flex flex-col items-center mr-12">
          <Image 
              src="/home/icon-4.png" 
              width = {86}
              height = {86}
              className="w-3/7 h-auto mt-3" 
              alt="icon-4.png" 
            />
          <div className="break-words text-base text-center pt-10">
            The gold, silver, and bronze winners and the prizes they receive will be announced at the <a href="https://worldchildrensfestival.org/" className="underline">7th World Children's Festival</a> on July 1, 2024 at the National Mall across the U.S. Capitol.
          </div>
        </div>
        <div className="md:col-span-3 bg-neutral-white rounded-2xl p-10 shadow-md flex flex-col items-center mr-10">
          <Image 
              src="/home/icon-5.png" 
              width = {86}
              height = {86}
              className="w-3/7 h-auto mt-3" 
              alt="icon-5.png" 
          />
          <div className="break-words text-base text-center pt-10">
            The Arts Olympiad venue in Paris and the prizes for the gold, silver, and bronze winners will be announced in December 2023.
          </div>
        </div>
      </div>
    </main>
  );
}
