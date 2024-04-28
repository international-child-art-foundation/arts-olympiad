"use client";
import React from "react";
import "../../src/styles/AccordionNewStyle.css";
import { H2m } from "../common/texts/H2m";
import Turkey from "../../public/contest/turkey.png";
import AccordionCard from "./AccordionCard";
import Share from  "../../public/contest/share.png";
import Upload from "../../public/contest/upload.png";
import Review from "../../public/contest/review.png";
import Creative from "../../public/contest/creative.png";
import useWindowDimensions from "@/hooks/useWindowDimensions";

interface AccordionNewProps {}



const AccordionNew: React.FC<AccordionNewProps> = () => {
  const {windowWidth} = useWindowDimensions();
  const isMobile = windowWidth <= 768;
  return (
    <div className="self-center my-24 mb-36">
      <article className="md:flex flex-col mr-10 z-30" >
        <H2m className="font-medium font-montserrat text-center my-8 text-3xl md:text-4xl" >How to Enter</H2m>
      </article>
      <div className="accordion ">
        {/* BOX 1 */}
        <div className="box a1">
          <AccordionCard 
            heading="Sign Up"
            description="Sign up for free to create your account. See “Login” on top right."
            number={1}
            textColor="text-main-orange"
            borderColor="border-main-orange"
            image={Turkey}
            isMobile={isMobile}
          />
        </div>

        {/* BOX 2 */}
        <div className="box a2" data-title="2. Get Creative">
          <AccordionCard 
            heading="Get Creative"
            description="Create your painting, drawing, digital art, or AI art."
            number={2}
            textColor="text-main-purple"
            borderColor="border-main-purple"
            image={Creative}
            isMobile={isMobile}
          />
        </div>

        {/* BOX 3 */}
        <div className="box a3">
          <AccordionCard 
            heading="Upload"
            description="Upload your unique masterpiece as JPEG or PNG (max 4Mg). See “Upload” on top left."
            number={3}
            textColor="text-neutral-blue"
            borderColor="border-neutral-blue"
            image={Upload}
            isMobile={isMobile}
          />
        </div>

        {/* BOX 4 */}
        <div className="box a4">
          <AccordionCard 
            heading="Review"
            description="You will need to Wait 24 hours for the review process before visiting the Gallery to see your masterpiece."
            number={4}
            textColor="text-neutral-red"
            borderColor="border-neutral-red"
            image={Review}
            isMobile={isMobile}
          />
        </div>

        {/* BOX 5 */}
        <div className="box a5">
          <AccordionCard 
            heading="Share"
            description="Share your masterpiece with family and friends to get their votes. You can vote too!"
            number={5}
            textColor="text-main-green"
            borderColor="border-main-green"
            image={Share}
            isMobile={isMobile}
          />
        </div>
      </div>
    </div>
  );
};

export default AccordionNew;


















// "use client";
// import React, { useEffect, useState } from 'react';
// import '../../src/styles/AccordionNew.css';
// import '../../src/styles/AccordionNewStyle.css';

// const AccordionNew: React.FC = () => {
//     const [activeIndex, setActiveIndex] = useState(0);
//     const [slideWidth, setSlideWidth] = useState<number | undefined>(undefined);

//     useEffect(() => {
//         const handleResize = () => {
//             if (window.innerWidth > 480) {
//                 const activeSlide = document.querySelector('.slide.active');
//                 setSlideWidth(activeSlide ? activeSlide.clientWidth : undefined);
//             } else {
//                 setSlideWidth(undefined);
//             }
//         };

//         handleResize();
//         window.addEventListener('resize', handleResize);

//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, [activeIndex]);

//     const handleSlideClick = (index: number) => {
//         setActiveIndex(index);
//     };

//     const slides = [
//         { title: "Section title 1", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis magna eget placerat consequat. ..." },
//         { title: "Section title 2", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis magna eget placerat consequat. ..." },
//         { title: "Section title 3", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis magna eget placerat consequat. ..." },
//         { title: "Section title 4", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis magna eget placerat consequat. ..." },
//         { title: "Section title 5", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis magna eget placerat consequat. ..." },
//     ];

//     return (
//         <div className="container">
//             <div className="container-slides">
//                 <ul className="slides">
//                     {slides.map((slide, index) => (
//                         <li key={index} className={`slide ${index === activeIndex ? 'active' : ''} brand${index + 1}`}>
//                             <a href="#" className="action" onClick={() => handleSlideClick(index)}>
//                                 <span>{slide.title}</span>
//                             </a>
//                             <div className="slide-content" style={{ width: slideWidth ? `${slideWidth}px` : 'auto' }}>
//                                 <h2>{slide.title}</h2>
//                                 <p>{slide.content}</p>
//                             </div>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// };

// export default AccordionNew;


