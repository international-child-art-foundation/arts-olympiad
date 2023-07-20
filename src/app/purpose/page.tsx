import ContentContainer from "../../../components/ui/ContentContainer";
import Image from "next/image";

export default function page() {
  return (
    <div>
      {/* title */}
      <div className="bg-secondary-blue flex flex-row">
        <div className="bg-secondary-blue break-words font-semibold text-4xl pl-6 md:pl-20 pt-5 md:pt-10 mb-10">
          Purpose
        </div>
      </div>
      {/* engaging creative kids block */}
      <div className="bg-secondary-blue pb-10">
        <div className="bg-neutral-white rounded-2xl p-10 md:p-5 shadow-md flex flex-col md:flex-row items-start mx-auto w-11/12">
          {/* earth part */}
          <div className="flex flex-col items-center mb-15 md:w-3/7">
            <div className="break-words font-semibold text-3xl text-center md:text-left pl-6 md:pl-10 pt-5 md:pt-10 mb-10">
              Engaging Creative Kids in the Olympics
            </div>
            <Image className="w-3/5 h-auto" src="/purpose/icaf-2.svg" alt="An earth-like human waving at you with a smile" width={174} height={174} />
          </div>
          {/* pie chart part */}
          <div className="flex flex-col items-center pt-0 md:pt-10 md:pl-20 md:w-4/7">
            <div className="break-words text-base text-center md:text-left mb-5 md:mb-0">
              A survey of 9,000 kids by a U.K. advertising company, KidsKnowBest, revealed that about 50% seemed uninterested in watching the Olympics.
            </div>
            <Image className="w-full h-auto md:mt-10 md:mr-10 hidden md:block" src="/purpose/chart-desktop.svg" alt="A pie chart shows 50% of children are not interested in Olympics" width={174} height={174} />
            <Image className="w-full h-auto md:mt-10 md:mr-10 block md:hidden" src="/purpose/chart-mobile.svg" alt="A pie chart shows 50% of children are not interested in Olympics" width={174} height={174} />
          </div>
        </div>
      </div>
      {/* Arts Olympiad block */}
      <div className="bg-secondary-blue md:pt-10">
        <div className="bg-neutral-white rounded-2xl p-10 md:p-5 shadow-md flex flex-col items-start mx-auto w-11/12">
          {/* skater part */}
          <div className="flex flex flex-col md:flex-row items-left">
            <div className="flex flex-col items-center md:w-2/5 md:mr-10">
              <div className="break-words font-semibold text-3xl text-center md:text-left pt-5 md:pt-10 mb-10">
                The Arts Olympiad
              </div>
              <Image className="w-1/2 h-1/2 md:mt-3" src="/purpose/illustration-08.svg" alt="A long hair skater with red sweater" width={211} height={211} />
            </div>
            <div className="flex flex-col items-center md:w-3/5 md:mt-10 md:mr-10">
              <div className="break-words text-base text-center md:text-left">
                By bringing together countries and cultures from around the world, the Paris 2024 Olympics will reassure kids that their chaotic and divided world has hope. 
              </div>
              <br></br>
              <div className="break-words text-base text-center md:text-left">
                The Arts Olympiad brings excitement to Paris and a Create & Share interactivity that engages creative kids worldwide in the Olympics and the Olympic Movement. They participate in #MyFavoriteSport and become inspired by the Olympic values of excellence, friendship, and respect.
              </div>
              <br></br>
              <div className="break-words text-base text-center md:text-left">
                The Arts Olympiad connects Paris and Washington with the launch of the global contest at the Parisian exhibition in March 2024 and the announcement of the winners at the National Mall across the U.S. Capitol on July 1, 2024. 
              </div>
            </div>
          </div>
          {/* water polo player part */}
          <div className="flex flex flex-col md:flex-row items-left">
            <div className="md:w-2/5 flex flex-col items-center">
              <Image className="w-2/5 h-auto md:mt-10" src="/purpose/illustration-06.svg" alt="A smiling water polo player" width={211} height={211} />
            </div>
            <div className="flex flex-col items-center md:w-3/5 md:mt-10 md:mr-10 md:ml-10">
              <div className="break-words text-base text-center md:text-left">
                The global art contest on My Favorite Sport will bring personal and social benefits because creative kids face obesity risks in this TikTok sedentary era. Together, art and sport possess the power to inspire them to embrace the “Artist-Athlete Ideal” of the creative mind and healthy body (mens sana in corpore sano). When kids depict themselves as “artist-athletes” in their artwork on the theme, My Favorite Sport, their revised self-image as “artist-athletes” solidifies. Young artists and young athletes grow fellow feelings and empathic understanding, celebrating their creativity, diversity, and unity.
              </div>
              <br></br>
              <div className="break-words text-base text-center md:text-left">
                #MyFavoriteSport will go viral, involving millions of young artists worldwide to produce original works and young and old across the globe to vote for their favorite artwork.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
