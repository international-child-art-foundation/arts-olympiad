import Image from "next/image";
import { gsap } from "gsap";
import { UserArtworkSchema } from "@/interfaces/artwork_shapes";
import React, { memo, useState } from "react";

type ArtworkCardProps = {
  data: UserArtworkSchema;
  voted: boolean;
  openModal: (id: string) => void;
};

function checkSameProps(prevProps: ArtworkCardProps, nextProps: ArtworkCardProps) {
  // if (prevProps.data.id === nextProps.data.id) {
  //   console.log("Found that prevProps were the same as nextProps. Not re-rendering.");
  // } else {
  //   console.log("Found different artwork card props. re-rendering.");
  // }
  return prevProps.data.sk === nextProps.data.sk && prevProps.voted === nextProps.voted;
}

const ArtworkCard = ({ data, openModal, voted }: ArtworkCardProps) => {
  const manageEnter = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.target, { scaleX: 1.2, scaleY: 1.2, duration: 0.3, ease: "power3.inout" });
  };

  const manageLeave = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.target, { scaleX: 1, scaleY: 1, duration: 0.3, ease: "power3.inout" });
  };


  const [imageError, setImageError] = useState(false);

  const imageUrl = `${process.env.NEXT_PUBLIC_CLOUDFRONT_DISTRIBUTION_URL}/${data.sk}/thumb.webp`;

  if (imageError) {
    return null; // Don't render the card if the image fails to load
  }

  return (
    <div id={data.sk} className="relative w-full h-full rounded-lg bg-neutral-white">
      {/* backdropFilter causes one-pixel-off graphical error, need to hardcode 6px rounding and put <p> up here*/}
      <p className="rounded-[6px] py-2 px-4 z-40 absolute top-0 left-0 bg-[#ffffff80] font-normal text-xs xl:text-sm"
        style={{
          backdropFilter: "blur(13px)",
        }}            
      >
        {data.votes} {data.votes == 1 ? "Vote" : "Votes"}
      </p>
      <div className="shadow-gray-400 shadow-md rounded-lg">
        <section className="w-full h-32 md:h-60 xl:h-52 mxl:h-56 rounded-t-lg overflow-hidden relative select-none">
          <div className="z-20 w-full h-full relative">
            {voted && <p className="rounded-lg py-1 px-2 m-2 z-40 absolute top-0 right-0 bg-green-300 opacity-90 font-normal text-xs xl:text-sm">
              Your Vote
            </p>}
            <Image
              fill
              src={imageUrl}
              alt={data.f_name}
              onMouseEnter={(e) => manageEnter(e)}
              onMouseLeave={(e) => manageLeave(e)}
              onClick={() => openModal(data.sk)}
              className="w-full h-fit object-cover object-center cursor-pointer"
              onError={() => setImageError(true)}
            />
            <div
              className="w-fit max-w-full rounded-tl-lg absolute bottom-0 right-0 bg-[#ffffff80]"
              style={{
                backdropFilter: "blur(13px)",
              }}
            >
              <p className="max-w-full py-2 px-4 text-right font-normal text-xs xl:text-sm truncate">
                {data.location}
              </p>
            </div>
          </div>
        </section>
        <section className="w-full h-36 xl:h-44 mxl:h-40 rounded-b-lg overflow-hidden relative">
          <p className="p-4 text-base font-semibold xl:texl-xl truncate">{data.f_name}</p>
          <p className="px-4 pb-4 text-sm font-normal xl:texl-base truncate">Age {data.age}</p>
          <div className="flex -mt-1 xl:mt-4 mxl:mt-2">
            <button
              onClick={() => openModal(data.sk)}
              className="mx-4 bg-new-blue w-full py-3 rounded text-center text-sm cursor-pointer tracking-wide text-neutral-white"
            >
              View
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default memo(ArtworkCard, checkSameProps);