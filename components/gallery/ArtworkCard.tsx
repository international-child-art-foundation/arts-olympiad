import Image from "next/image";
import { gsap } from "gsap";

type ArtworkCardProps = {
  id: string;
  name: string;
  age: number;
  country: string[];
  votes: number;
  url: string;
  sport: string[];
  paramsObj: Record<string, string[]>;
  openModal: (id: string) => void;
};

const ArtworkCard = ({ id, name, age, country, votes, url, openModal }: ArtworkCardProps) => {

  const manageEnter = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.target, { scaleX: 1.2, scaleY: 1.2, duration: 0.3, ease: "power3.inout" });
  };

  const manageLeave = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.target, { scaleX: 1, scaleY: 1, duration: 0.3, ease: "power3.inout" });
  };

  return (
    <div id={id} className="relative w-full h-full rounded-lg">
      <div className="shadow-gray-400 shadow-md rounded-lg">
        <section className="w-full h-32 md:h-60 xl:h-52 mxl:h-56 rounded-t-lg overflow-hidden relative select-none">
          <div className="z-20">
            <p className="rounded-lg py-2 px-4 z-40 absolute top-0 left-0 bg-[#ffffff1a] font-normal text-xs xl:text-sm">
              {votes} Votes
            </p>
            <Image
              fill
              src={url} 
              alt={name}
              onMouseEnter={(e) => manageEnter(e)}
              onMouseLeave={(e) => manageLeave(e)}
              onClick={() =>openModal(id)}
              className="w-full h-fit object-cover object-center cursor-pointer"
            />
            <div className="w-fit max-w-full rounded-tl-lg absolute bottom-0 right-0 bg-[#ffffff80]" style={{
              backdropFilter: "blur(13px)",
            }}>
              <p className="max-w-full py-2 px-4 text-right font-normal text-xs xl:text-sm truncate">
                {country[1]}{country[0]}
              </p>
            </div>
          </div>
        </section>
        
        <section className="w-full h-36 xl:h-44 mxl:h-40 rounded-b-lg overflow-hidden relative">
          <p className="p-4 text-base font-semibold xl:texl-xl truncate">{name}</p>
          <p className="px-4 pb-4 text-sm font-normal xl:texl-base truncate">Age {age}</p>
          <div className="flex -mt-1 xl:mt-4 mxl:mt-2">
            <button onClick={() =>openModal(id)} className="mx-4 bg-new-blue w-full py-3 rounded text-center text-sm cursor-pointer tracking-wide text-neutral-white">
              View
            </button>
          </div>

        </section>
      </div>
    </div>
  );
};

export default ArtworkCard;