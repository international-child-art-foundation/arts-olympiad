import React, { forwardRef } from "react";
import { LazyImage } from "../../common/images/LazyImage";
import { IWisdom } from "../../../mock/wisdomItems";
// import { H3m } from "../../common/texts/H3m";
// import { Pm } from "../../common/texts/Pm";

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
      <div className="absolute inset-0 overflow-hidden rounded-xl w-full h-full lg:p-2">
        <LazyImage className="w-full h-full object-cover select-none" width={50} height={50} imageUrl={wisdom.url} alt={wisdom.alt} /> 
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
        </div>
      </div>
    </div>
  );
});


WisdomCard.displayName = "WisdomCard";