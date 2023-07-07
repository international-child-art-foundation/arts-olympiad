import bannerImage from "../../public/banner-image.png";
import Image from "next/image";

export default function Home() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-10 bg-neutral-white">
      {/* <div className="bg-neutral-white md:col-span-6 relative">
        <Image 
          src={bannerImage}
          alt="banner-image.png"
          fill={true}
          style={{objectFit: "fill"}}
        />
      </div> */}
      <div className="bg-neutral-white relative md:col-span-6">
        <img 
          src="/banner-image.png"
          alt="banner-image.png"
          className="w-full "
          style={{objectFit: "fill"}}
        />
      </div>

      <div className="bg-neutral-white md:col-span-4">
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
    </main>
  );
}
