import { ArtistShowcaseInterface } from "../../../mock/artistShowcaseInterface";
import { artistShowcaseList } from "../../../mock/artistShowcaseItems";
import { gsap } from "gsap";
import { Flip } from "gsap/all";
import { useEffect, useRef } from "react";
import Image from "next/image";

gsap.registerPlugin(Flip);


export const DesktopArtistShowcase: React.FC<ArtistShowcaseInterface> = ({activeIndex, setActiveIndex}) => {
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    handleIndexChange(activeIndex);
  });

  const handleIndexChange = (newIndex: number) => {
    const state = Flip.getState(".grid-animation-target");
    const normalizedIndex = ((newIndex % artistShowcaseList.length) + artistShowcaseList.length) % artistShowcaseList.length;
    setActiveIndex(normalizedIndex);
  
    // Calculate and apply new classes to each item
    document.querySelectorAll(".grid-animation-target").forEach((element: Element) => {
      const idx = Number(element.getAttribute("data-index"));
      const total = artistShowcaseList.length;
      const relativePosition = (idx - newIndex + total) % total;
  
      let imageClasses = [];
      switch (relativePosition) {
      case 0:
        imageClasses = ["col-start-1", "row-start-1", "row-span-2", "col-span-2", "z-100"]; // center
        break;
      case 1:
        imageClasses = ["col-start-3", "row-start-2", "row-span-1", "col-span-1", "z-10"]; // oneAfter
        break;
      case total - 1:
        imageClasses = ["col-start-3", "row-start-1", "row-span-1", "col-span-1", "z-10"]; // oneBefore
        break;
      case 2:
        imageClasses = ["col-start-4", "row-start-2", "row-span-1", "col-span-1", "z-10"]; // twoAfter
        break;
      case total - 2:
        imageClasses = ["col-start-4", "row-start-1", "row-span-1", "col-span-1", "z-10"]; // twoBefore
        break;
      default:
        imageClasses = ["col-start-5", "row-start-1", "row-span-2", "col-span-1", "z-10"]; // unseenBefore
        break;
      }
      // Remove all position classes
      element.classList.remove("col-start-1", "col-start-2", "col-start-3", "col-start-4", "col-start-5",
        "row-start-1", "row-start-2", "row-span-1", "row-span-2", "z-0", "z-10", "z-100", "col-span-2", "col-span-1");
      // Add new classes one by one
      imageClasses.forEach(cls => element.classList.add(cls));
    });
  
    // Perform the Flip animation with updated class positions
    Flip.from(state, {
      targets: ".grid-animation-target",
      ease: "power1.inOut",
      absolute: false,
      scale: false,
    });
  };
    
  return (
    <div className=" w-[80%] max-w-[1200px] overflow-hidden mx-auto">     
      <div className="grid gap-4 h-[478px] lg:w-[165%] xl:w-[125%] grid-cols-5 grid-rows-2">
        {artistShowcaseList.map((artwork, idx) => (
          <>
            <div key={idx} data-index={idx} onClick={() => handleIndexChange(idx)} className=" rounded-[20px] grid-animation-target overflow-hidden content-center">
              <div className="relative row-span-2 row-start-1 col-start-1">
                <Image 
                  className="rounded-[20px] object-cover m-auto h-full w-full" 
                  src={artwork.url} 
                  alt={artwork.alt} 
                  width={600} 
                  height={500}
                  style={{ objectPosition: "bottom" }}
                />
              </div>
            </div>
          </>
        ))}
        <div ref={labelRef} className="p-4 transition-opacity flex flex-col rounded-[20px] opacity-80  w-full col-span-2" style={{
          borderRadius: "0px 0px 20px 20px",
          background: "rgba(255, 255, 255, 0.25)",
          boxShadow: "0px 20px 26px 0px rgba(0, 0, 0, 0.05), 0px 8px 9px 0px rgba(0, 0, 0, 0.06)",
          backdropFilter: "blur(15px)",
          
        }}>
          <p className="font-semibold">{artistShowcaseList[activeIndex].author}</p>
          <p>Age {artistShowcaseList[activeIndex].age} | {artistShowcaseList[activeIndex].location}</p>
        </div>
      </div>
    </div>
  );
};