import bannerImage from "../../public/banner-image.svg";
import Image from "next/image";
import Button from "../../components/ui/Button";

export default function Home() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-10 bg-neutral-white">
      {/* banner block */}
      <div className="bg-neutral-white col-span-1 md:col-span-6 aspect-w-16 aspect-h-9 relative">
        <Image 
          width={1500}
          height={850}
          src={bannerImage}
          alt="bars making a smooth 90 degree curve in olympic colors"
          // fill={true}
          style={{objectFit: "fill"}}
        />
      </div>
      {/* <div className="bg-neutral-white relative md:col-span-6">
        <img 
          src="/banner-image.png"
          alt="bars making a smooth 90 degree curve in olympic colors"
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

      <div className="bg-main-yellow md:col-span-10 grid md:grid-cols-2 grid-cols-1">
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
            alt="girl doing gymnast pose" 
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
            alt="a smiling judge with a curly mustache" 
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
            Vote Deadline is June 29, 2024
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
          alt="a swimmer doing a butterfly stroke" 
        />
        <Button link="/gallery" mainButton nonNav>Explore</Button>
      </div>
      {/* 2024 arts olympiad introduction */}
      {/* - logo and text - */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-12 bg-secondary-blue col-span-1 md:col-span-10">
        <Image 
          src="/home/torch-logo.png" 
          width = {151}
          height = {139}
          className="md:mt-16 md:ml-20 md:mb-10 md:col-span-2 col-span-1 justify-self-left mt-5 ml-5 mb-5" 
          alt="2024 olympics torch ablaze" 
        />
        <div className="text-left text-xl ml-5 md:mt-36 md:mb-10 break-words md:col-span-4">
            An interactive exhibition in Paris to celebrate Creativity, Diversity, and Unity.
        </div>
        <div className="hidden md:block md:col-span-6"></div>
        <div className="hidden md:block md:col-span-1"></div>
        <div className="md:col-span-3 bg-neutral-white rounded-r-full rounded-l-2xl md:rounded-2xl shadow-md flex flex-row md:flex-col items-center md:ml-20 ml-5 mr-5">
          <Image 
            src="/home/icon-1.png" 
            width = {86}
            height = {86}
            className="hidden md:block md:w-3/7 w-1/2 h-auto md:mt-3" 
            alt="painting panel with mixed paints" 
          />
          <div className="break-words text-base text-center md:pt-7 md:pr-7 md:pl-7">
            Visitors ages 10 to 20 Create, Upload, and Share their masterpieces to win the Gold!
          </div>
          <Image 
            src="/home/icon-1.png" 
            width = {86}
            height = {86}
            className="block md:hidden md:w-3/7 w-1/2 h-auto md:mt-3" 
            alt="painting panel with mixed paints" 
          />
        </div>
        <div className="md:col-span-3 bg-neutral-white rounded-l-full md:rounded-2xl p-10 shadow-md flex flex-row md:flex-col items-center ml-5 mr-5 md:ml-10 md:mr-10">
          <Image 
            src="/home/icon-2.png" 
            width = {86}
            height = {86}
            className="w-1/4 md:w-1/2 md:mt-3" 
            alt="written document with a checkmark" 
          />
          <div className="break-words text-base text-center md:pt-10">
            Visitors vote for their favorite artwork.
          </div>
        </div>
        <div className="md:col-span-3 bg-neutral-white rounded-r-full rounded-l-2xl md:rounded-2xl p-10 shadow-md flex flex-row md:flex-col items-center ml-5 mr-5 md:mr-20">
          <Image 
            src="/home/icon-3.png" 
            width = {86}
            height = {86}
            className="hidden md:block md:w-3/7 w-1/2 h-auto md:mt-3" 
            alt="Image of a girl with a globe as her head" 
          />
          <div className="break-words text-base text-center md:pt-10">
            #MyFavoriteSport contest will spread across Europe and the world from Paris.
          </div>
          <Image 
            src="/home/icon-3.png" 
            width = {86}
            height = {86}
            className="block md:hidden md:w-3/7 w-1/2 h-auto md:mt-3" 
            alt="Image of a girl with a globe as her head" 
          />
        </div>
        <div className="hidden md:block md:col-span-2"></div>
        <div className="hidden md:block md:col-span-3"></div>
        <div className="md:col-span-3 bg-neutral-white rounded-l-full md:rounded-2xl p-10 shadow-md flex flex-row md:flex-col items-center ml-5 mr-5 md:mr-12 md:mb-10">
          <Image 
            src="/home/icon-4.png" 
            width = {86}
            height = {86}
            className="md:w-3/5 w-full h-auto md:mt-3" 
            alt="lightbulb with the words 'world childrens festiaval inside' " 
          />
          <div className="break-words text-base text-center md:pt-10">
            The gold, silver, and bronze winners and the prizes they receive will be announced at the <a href="https://worldchildrensfestival.org/" className="underline">7th World Children's Festival</a> on July 1, 2024 at the National Mall across the U.S. Capitol.
          </div>
        </div>
        <div className="md:col-span-3 bg-neutral-white rounded-r-full rounded-l-2xl md:rounded-2xl p-10 shadow-md flex flex-row md:flex-col items-center ml-5 mr-5 md:mr-10 mb-10">
          <Image 
            src="/home/icon-5.png" 
            width = {86}
            height = {86}
            className="hidden md:block md:w-3/7 w-3/5 h-auto md:mt-3" 
            alt="a hand holding the earth as a globe" 
          />
          <div className="break-words text-base text-center md:pt-10">
            The Arts Olympiad venue in Paris and the prizes for the gold, silver, and bronze winners will be announced in December 2023.
          </div>
          <Image 
            src="/home/icon-5.png" 
            width = {86}
            height = {86}
            className="block md:hidden md:w-3/7 w-3/5 h-auto md:mt-3" 
            alt="a hand holding the earth as a globe" 
          />
        </div>
      </div>
      {/* Sponsors */}
      {/* Sponsor Title */}
      <div className="bg-main-yellow col-span-1 md:col-span-10 flex flex-row">
        <div className="w-full mt-10 mb-10 ml-5 md:ml-10 md:ml-20 md:mt-20">
          <div className="break-words font-semibold text-4xl">
            Sponsors
          </div>
        </div>
      </div>
      {/* 3 white blocks */}
      <div className="bg-main-yellow col-span-1 md:col-span-10 grid grid-cols-12">
        <div className="col-span-5 flex flex-col items-center bg-neutral-white rounded-2xl ml-5 md:ml-20 mr-5 mb-10">
          <div className="break-words font-semibold text-3xl text-main-gold mt-10 mb-5">
            Gold
          </div>
          <hr className="w-11/12 border-t-2 border-gray-500 mb-10 ml-5 mr-5" />
          <div className="flex flex-col md:flex-row items-center mb-8">
            <Image 
              width={163}
              height={76}
              src="icaf-logo-transparent.svg" 
              alt="ICAF logo"
              className="md:ml-5 w-5/6 md:w-1/4 mb-4 md:mb-0"
            />
            <Image 
              width={163}
              height={76}
              src="icaf-logo-transparent.svg" 
              alt="ICAF logo"
              className="md:ml-10 w-5/6 md:w-1/4 mb-4 md:mb-0"
            />
            <Image 
              width={163}
              height={76}
              src="icaf-logo-transparent.svg"
              alt="ICAF logo"
              className="md:ml-10 md:mr-10 md:w-1/4 w-5/6 md:mb-0"
            />
          </div>
        </div>
        <div className="col-span-4 flex flex-col items-center bg-neutral-white rounded-2xl mr-5 mb-10">
          <div className="break-words font-semibold text-3xl text-main-silver mt-10 mb-5">
            Silver
          </div>
          <hr className="w-11/12 border-t-2 border-gray-500 mb-10 ml-5 mr-5" />
          <div className="flex flex-col md:flex-row items-center">
            <Image 
              width={163}
              height={76}
              src="icaf-logo-transparent.svg"
              alt="ICAF logo"
              className="md:ml-10 md:w-1/5 w-4/5 mb-4 md:mb-0"
            />
            <Image 
              width={163}
              height={76}
              src="icaf-logo-transparent.svg"
              alt="ICAF logo"
              className="md:ml-10 md:w-1/5 w-4/5 mb-4 md:mb-0"
            />
            <Image 
              width={163}
              height={76}
              src="icaf-logo-transparent.svg"
              alt="ICAF logo"
              className="md:ml-10 md:w-1/5 w-4/5"
            />
          </div>
        </div>
        <div className="col-span-3 flex flex-col items-center bg-neutral-white rounded-2xl mr-5 md:mr-20 mb-10">
          <div className="break-words font-semibold text-3xl text-main-bronze mt-10 mb-5">
            Bronze
          </div>
          <hr className="w-11/12 border-t-2 border-gray-500 mb-10 ml-5 mr-5" />
          <div className="flex flex-col md:flex-row items-center">
            <Image 
              width={163}
              height={76}
              src="icaf-logo-transparent.svg"
              alt="ICAF logo"
              className="md:ml-10 w-3/4 md:w-1/6 mb-10 md:mb-0"
            />
            <Image 
              width={163}
              height={76}
              src="icaf-logo-transparent.svg"
              alt="ICAF logo"
              className="md:ml-10 w-3/4 md:w-1/6 mb-10 md:mb-0"
            />
            <Image 
              width={163}
              height={76}
              src="icaf-logo-transparent.svg"
              alt="ICAF logo"
              className="md:ml-10 w-3/4 md:w-1/6"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
