import React, { forwardRef } from "react";
import { LazyImage } from "../../common/images/LazyImage";
import { IWisdom } from "../../../mock/wisdomItems";
import { H3m } from "../../common/texts/H3m";
import { Pm } from "../../common/texts/Pm";

interface IProps {
  wisdom: IWisdom;
  onClick: () => void;
}

export const WisdomCard = forwardRef<HTMLDivElement, IProps>(({ wisdom, onClick }, ref) => {
  return (
    <div
      ref={ref}
      className="
        thumbnail
        overflow-hidden
        cursor-pointer
        absolute
        rounded-xl
        font-montserrat
        font-bold
      "
      onClick={onClick}
    >
      <div className="absolute inset-0 overflow-hidden rounded-xl w-full h-full p-2 ">
        <LazyImage className="w-full h-full object-cover select-none" width={50} height={50} imageUrl={wisdom.url} alt={wisdom.alt} /> 
        {/* <div
            // ref={wisdomTextRef}
            className="flex flex-col md:flex-col backdrop-blur-[30px] absolute bottom-0 z-50 bg-white opacity-25 w-full overflow-hidden max-w-full"
          >
            <H3m className="z-20 mb-0 font-semibold row-span-1 xl:text-2xl lg:text-xl overflow-hidden whitespace-nowrap text-overflow-ellipsis font-montserrat">{wisdom.author}</H3m>
            <Pm className="text-sm font-openSans font-normal z-20 row-span-1 overflow-hidden text-overflow-ellipsis">{wisdom.wisdomText}</Pm>
          </div> */}
        <div
          className="
            cardLabel
            thumbnail-textfield
            h-[20%]
            w-full
            absolute
            bottom-0
          "
        >
          {/* <div className="
            absolute
            w-full
            h-full
            bg-white bg-opacity-25
            rounded-b-xl
            backdrop-blur-[5px]
            "
          ></div> */}
          {/* <div
            className="
              cardLabel
              thumbnail-textfield
              absolute
              bottom-0
              w-full
              h-full
              text-[#FAFAFA]
              rounded-b-xl
              flex
              items-center
              justify-center
        
            "
          >
            <H3m className="absolute select-none font-montserrat font-semibold z-10">{wisdom.author}</H3m>
          </div> */}
        </div>
      </div>
    </div>
  );
});

WisdomCard.displayName = "WisdomCard";