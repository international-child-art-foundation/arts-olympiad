"use client";
import { ExpandingDiv } from "./ExpandingDiv";
import { ExpandingDivProps } from "./ExpandingDiv";
import { useState, useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { H2m } from "../common/texts/H2m";
import { AnimatedScribble } from "../common/decorations/AnimatedScribble";

const SponsorshipSectionData: ExpandingDivProps = {
  background: "bg-some-color",
  sections: [
  ],
};

const GeneralQueriesSectionData: ExpandingDivProps = {
  background: "bg-other-color",
  sections: [
  ],
};

const ContestSectionData: ExpandingDivProps = {
  background: "bg-baby-blue",
  sections: [
    {
      title: "Introduction to Art in the olympics",
      description: "Baron Pierre de Coubertin, the founder of the modern Olympics, tried to include art competitions from the very beginning. He stated that in the ancient games, “sport exhibitions walked in equality with artistic exhibitions,” which sets the Olympics apart from other sporting events. In some of the earlier Olympics, artists also won gold medals. For more, see Smithsonian Magazine.",
    },
    {
      title: "ICAF’s Origin and Mission",
      description: "Founded in 1997 as American children’s their national arts organization and the world’s children’s global arts organization, ICAF has endeavored to include youth artwork in the Olympics. The #MyFavoriteSport art contest related to the Paris Olympics will become even larger for LA28.",
    },
    {
      title: "The Arts Olympiad Program",
      description:
        "ICAF organizes a free school art program—the Arts Olympiad—which combines art and sport to motivate students to become &quot;artist-athletes&quot; who have a creative mind and healthy body. (mente sana in corpo sano).",
    },
    {
      title: "Olympic Licensing and Recognition",
      description:
        "The U.S. Olympic and Paralympic Committee has granted ICAF an exclusive license to use the “Arts Olympiad” and “International Child Arts Olympiad” marks. The Arts Olympiad was included in New York City’s bid for the 2024 Olympiad. ",
      buttons: [
        {
          href: "#apply", 
          classNames: ["font-light text-lg leading-normal", "inline", "rounded", "underline"],
          children: ["See here for a 3-page except from New York’s Candidature File."] 
        }
      ]
    },
    {
      title: "World Children's Festival",
      description:
        "Every four years, ICAF produces the World Children’s Festival as the “Olympics” of children’s imagination at the National Mall in Washington, D.C.",
      buttons: [
        {
          href: "#learn-more",
          classNames: ["text-white", "bg-dark-blue", "font-openSans", "px-4", "py-2", "inline-flex", "rounded"],
          children: ["Learn More about ICAF"]
        }
      ]
    },
  ],
};


const sections = {
  contest: ContestSectionData,
  sponsorship: SponsorshipSectionData,
  general: GeneralQueriesSectionData,
};

type SectionType = "contest" | "sponsorship" | "general";

export const FaqDropdowns = () => {
  const [activeSection, setActiveSection] = useState<SectionType>("contest");
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [transitioningSection, setTransitioningSection] =
    useState<SectionType | null>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const [, setWindowWidth] = useState(0);

  const updateUnderlinePosition = useCallback(() => {
    if (containerRef.current) {
      const activeButton = document.querySelector(`.Pm-${activeSection}`);
      if (activeButton && underlineRef.current) {
        const buttonRect = activeButton.getBoundingClientRect();
        gsap.set(underlineRef.current, {
          x: buttonRect.left - containerRef.current.getBoundingClientRect().left,
          width: buttonRect.width,
        });
      }
    }
  }, [activeSection, containerRef, underlineRef]);
  const handleResize = useCallback(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      updateUnderlinePosition();
    }
  }, [updateUnderlinePosition]); 
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [handleResize]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [activeSection, handleResize]);
      
  useEffect(() => {
    const handleLoad = () => {
      const contestButton = document.querySelector(".Pm-contest");
      if (contestButton && underlineRef.current && containerRef.current) {
        const buttonRect = contestButton.getBoundingClientRect();
        gsap.set(underlineRef.current, {
          x:
            buttonRect.left - containerRef.current.getBoundingClientRect().left,
          width: buttonRect.width + 5,
        });
      }
    };

    window.addEventListener("load", handleLoad);

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  const handleSectionClick = (section: SectionType) => {
    if (activeSection !== section && !isAnimating && containerRef.current) {
      setTransitioningSection(activeSection);
      setIsAnimating(true);

      const clickedElement = document.querySelector(`.Pm-${section}`);
      const currentElement = document.querySelector(`.Pm-${activeSection}`);
      const containerRect = containerRef.current.getBoundingClientRect();

      // Underline starting animation
      if (currentElement && clickedElement) {
        const currentRect = currentElement.getBoundingClientRect();
        const nextRect = clickedElement.getBoundingClientRect();
        if (currentRect.right < nextRect.right) {
          // moving right to left
          const gapPosition =
            currentRect.right +
            (nextRect.left - currentRect.right) / 2 -
            containerRect.left;
          gsap.to(underlineRef.current, {
            x: gapPosition,
            width: 0,
            duration: 0.5,
            ease: "power3.out",
          });
        } else {
          // moving left to right
          const gapPosition =
            currentRect.left +
            (nextRect.right - currentRect.left) / 2 -
            containerRect.left;
          gsap.to(underlineRef.current, {
            x: gapPosition,
            width: 0,
            duration: 0.5,
            ease: "power3.out",
          });
        }
      }
      // Section shrink animation
      gsap.to(containerRef.current, {
        height: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
        onComplete: () => {
          setActiveSection(section);
          if (clickedElement && underlineRef.current && containerRef.current) {
            const clickedElementRect = clickedElement.getBoundingClientRect();
            const containerRect = containerRef.current.getBoundingClientRect();
            const newWidth =
              clickedElementRect.width + clickedElementRect.width / 21; // Add 1/21 width to account for bolded content shift
            const newPosition = clickedElementRect.left - containerRect.left;

            // Underline ending animation
            gsap.to(underlineRef.current, {
              width: newWidth,
              x: newPosition,
              duration: 0.8,
              ease: "power3.out",
            });
            // Section grow animation
            if (containerRef.current) {
              setTimeout(() => {
                if (containerRef.current) {
                  gsap.to(containerRef.current, {
                    height: "auto",
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    onComplete: () => {
                    },
                  });
                }
              }, 0);
            }
          }
          setIsAnimating(false);
          setTransitioningSection(null);
        },
      });
    }
  };

  // Return number of entries only on large screens
  // type SectionKey = keyof typeof sections;
  // function displayText(key: SectionKey) {
  //   if (windowWidth > 500) {
  //     return `${key.charAt(0).toUpperCase() + key.slice(1)} (${
  //       sections[key].sections.length
  //     })`;
  //   } else {
  //     return `${key.charAt(0).toUpperCase() + key.slice(1)}`;
  //   }
  // }

  return (
    <>
      <article className=" text-center md:flex flex-col mr-10 ml-10 mt-36 overflow-hidden" >
        <H2m className="font-medium font-montserrat text-2xl md:text-4xl" >How ICAF became a part of the Olympics<span className="relative">Work?
          <AnimatedScribble width={180} className="absolute -bottom-6 -right-20 stroke-new-blue" />
        </span>
        </H2m>
      </article>
      <section className="relative z-20 mt-10 overflow-x-visible max-w-screen-2xl px-4 md:px-4 lg:px-16 xl:px-20 pb-12">
        <div className="text-nowrap flex flex-row gap-x-6 sm:gap-x-10 z-10 overflow-x-auto ">
          {(Object.keys(sections) as SectionType[]).map((key) => (
            <p
              key={key}
              className={`select-none cursor-pointer text-lg md:text-xl transition-color mb-2 px-1 Pm Pm-${key}
                    ${
            activeSection === key && transitioningSection !== key
              ? "text-new-blue font-bold " 
              : transitioningSection === key
                ? "text-gray-500 font-normal"
                : "text-default-color" 
            }`}
              onClick={() => handleSectionClick(key)}
            >
              {/* {displayText(key)} */}
            </p>
          ))}
        </div>
        {/* <div
          ref={underlineRef}
          className=" bg-new-blue absolute hidden xsm:block h-[3px] -mt-[3px] z-0 rounded-lg w-32"
        ></div> */}
        {/* <div className="block md:hidden mt-6 mb-0 flex flex-row mx-[10%] md:mx-[0%] md:row-start-1 md:row-end-3 md:col-start-3 md:col-end-5 justify-center">
          {(Object.keys(sections) as SectionType[]).map(key => (
            <div
              key={key}
              className={`
                      mx-2 rounded-full w-5 h-5 border-0.5 border-main-blue cursor-pointer 
                      ${activeSection === key && transitioningSection !== key 
              ? "bg-new-blue"  // Active and not transitioning
              : transitioningSection === key 
                ? "bg-new-blue opacity-50" // Transitioning
                : "bg-white" // Neither active nor transitioning
            }`}
              onClick={() => handleSectionClick(key)}
            >
            </div>
          ))}
        </div> */}
        <div className=" w-full min-h-[400px] rounded-lg ">
          <div
            ref={containerRef}
            className="px-4 sm:px-10 py-0 max-w-unset overflow-hidden bg-transparent rounded-lg"
          >
            <ExpandingDiv {...sections[activeSection]} />
          </div>
        </div>
      </section>
    </>
  );
};
