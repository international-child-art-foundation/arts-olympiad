import Image from "next/image";
// import { gsap } from "gsap";

type ArtworkCardProps = {
    id: string;
    name: string;
    age: number;
    country: string;
    votes: number;
    url: string; 
}

const ArtworkCard = ({ id, name, age, country, votes, url }: ArtworkCardProps) => {
  return (
    <div id={id} className="relative w-full h-full rounded-lg">
      <div className="shadow-gray-400 shadow-md rounded-lg">
        <section className="w-full h-32 md:h-60 xl:h-52 mxl:h-56 rounded-t-lg overflow-hidden relative">
          <div className="z-20">
            <p className="rounded-lg py-2 px-4 z-50 absolute top-0 left-0 bg-[#ffffff1a] font-normal text-xs xl:text-sm">
              {votes} Votes
            </p>
            <Image
              fill
              src={url} 
              alt={name}
              className="w-full h-fit object-cover object-center hover:scale-150"
            />
            <div className="w-fit max-w-full rounded-lg absolute bottom-0 right-0 bg-[#ffffff1a]">
              <p className="max-w-full py-2 px-4 text-right font-normal text-xs xl:text-sm truncate">
                {country}
              </p>
            </div>
          </div>
        </section>
        
        <section className="w-full h-36 xl:h-44 mxl:h-40 rounded-b-lg overflow-hidden relative">
          <p className="p-4 text-base font-semibold xl:texl-xl truncate">{name}</p>
          <p className="px-4 pb-4 text-sm font-normal xl:texl-base truncate">{age } Years old</p>
          <div className="flex -mt-1 xl:mt-4 mxl:mt-2">
            <a href={`/artwork/${id}`} className="mx-4 bg-new-blue w-full py-3 rounded text-center text-sm cursor-pointer tracking-wide text-neutral-white">
              View
            </a>
          </div>
        </section>
      </div>


    </div>
  );
};

export default ArtworkCard;