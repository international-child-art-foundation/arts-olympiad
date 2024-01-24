import React, { forwardRef } from "react";
import { LazyImage } from "../../common/images/LazyImage";
import { H3m } from "../../common/texts/H3m";
import { IWisdom } from "../../../mock/wisdomItems";

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
        border-1
        border-black
        rounded-xl
      "
      onClick={onClick}
    >
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        <LazyImage className="thumbnail-image w-full h-full object-cover select-none" imageUrl={wisdom.url} alt={wisdom.alt} />
        <div
          className="
            cardLabel
            thumbnail-textfield
            absolute
            bottom-0
            w-full
            h-[20%]
            bg-[#D9D9D9]
            rounded-b-xl
            flex
            items-center
            justify-center
            font-semibold
          "
        >
          <H3m className="select-none">{wisdom.author}</H3m>
        </div>
      </div>
    </div>
  );
});

WisdomCard.displayName = "WisdomCard";