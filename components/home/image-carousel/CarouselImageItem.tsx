import Image from "next/image";
import React, {useState, useEffect} from "react";

interface IProps {
  imageUrl: string
  alt: string
}
export const CarouselImageItem = ({imageUrl, alt}: IProps) => {

  const [loading, setLoading] = useState(false);

  return (
    <figure className=" mx-1 min-w-[150px] md:min-w-[250px] min-h-[110px] md:min-h-[180px] max-h-[110px] md:max-h-[180px]">
      <div className="relative w-full h-full rounded-lg bg-secondary-blue">
        <Image
          className="rounded-lg object-fit w-full h-full"
          src={imageUrl}
          alt={alt}
          width={200}
          height={110}
          loading="lazy"
          placeholder="empty"
          onLoad={() => setLoading(false)}
          onError={() => setLoading(false)}
        />
      </div>
    </figure>
  );
};