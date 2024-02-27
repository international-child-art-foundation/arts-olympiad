"use client";
import Image from "next/image";
import { ExpandingDiv } from "./ExpandingDiv";
import { ExpandingDivProps } from "./ExpandingDiv";
import { HeartIconWhite } from "../svgs/HeartIconWhite";
import { useState, useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import faqYelBlob from "../../public/svgs/blobs/faq-yel-blob.svg";
import faqPinkBlob from "../../public/svgs/blobs/faq-pink-blob.svg";

const ContestSectionData: ExpandingDivProps = {
  background: "bg-baby-blue",
  sections: [
    {
      title: "What file formats are allowed?",
      description: "We accept submissions in JPEG and PNG format.",
    },
    {
      title: "What is the maximum file size?",
      description: "The file size should not exceed 3MB.",
    },
    {
      title: "Are there any fees?",
      description:
        "No! This competition is completely free, thanks to our generous sponsors.",
    },
    {
      title: "When can I submit?",
      description:
        "Art submission can start on April 14th, 2024. This will coincide with our kickoff in Paris during our art exhibition! The submission deadline is June 15th 2024.",
    },
    {
      title: "How will the winners be chosen?",
      description:
        "The top 20 artworks will be selected based on public votes on this site, so be sure to share your submission on social media. These 20 finalists will make it to the next round where our sponsors will determine the top 3 winners.",
    },
  ],
};

const SponsorshipSectionData: ExpandingDivProps = {
  background: "bg-baby-blue",
  sections: [
    {
      title: "How can I be a sponsor?",
      description:
        "To explore sponsorship opportunities and learn about the unique benefits, please contact us.",
      buttons: [
        {
          href: "https://icaf.org/about/contact-us",
          classNames: [
            "group",
            "w-fit",
            "h-fit",
            "rounded-md",
            "text-center",
            "py-3.5",
            "px-4",
            "text-sm",
            "tracking-wide",
            "bg-new-blue",
            "text-neutral-white",
          ],
          children: ["Contact us"],
        },
      ],
    },
    {
      title: "What are the benefits?",
      description:
        "As a sponsor, you will gain visibility and recognition among our audience. You will also have the opportunity to support young artists to contribute to a meaningful cause.",
    },
    {
      title: "How does sponsorship work?",
      description:
        "Sponsorship involves providing financial support to our charity and the at competition. In return, sponsors receive various benefits such as brand exposure and recognition.",
    },
    {
      title: "Can I donate instead?",
      description:
        "Absolutely! If you prefer to make a donation instead of becoming a sponsor, we appreciate your support. Visit our donation page to contribute.",
      buttons: [
        {
          href: "https://icaf.org/donate",
          classNames: [
            "group",
            "w-fit",
            "h-fit",
            "rounded-md",
            "text-center",
            "py-3.5",
            "px-4",
            "text-sm",
            "tracking-wide",
            "bg-new-blue",
            "text-neutral-white",
          ],
          children: [<HeartIconWhite key="heart-icon" />, "Donate"],
        },
      ],
    },
  ],
};

const GeneralQueriesSectionData: ExpandingDivProps = {
  background: "bg-baby-blue",
  sections: [
    {
      title: "What is the #MyFavoriteSport website about?",
      description:
        "The #MyFavoriteSport website is a unique platform celebrating the intersection of art and athletics, inspired by the Olympic spirit. It’s a space where artists and sports enthusiasts can come together to showcase their creativity, participate in competitions, and engage with a global community.",
    },
    {
      title: "Who can participate in the #MyFavoriteSport competitions?",
      description:
        "Our competitions are open to artists aged between 14 and 20 years old. We encourage individuals who are passionate about combining the themes of sports and art to participate..",
    },
    {
      title: "How can I register for an account on the website?",
      description:
        "To register, simply click on the 'Register' button on our homepage. Follow the instructions to set up your account. You'll need to provide some basic information and verify your email address.",
    },
    {
      title: "Is there a mobile app available for #MyFavoriteSport?",
      description:
        "Currently, we do not have a mobile app, but our website is mobile-friendly. You can easily access all features of the site on your mobile device through a web browser.",
    },
    {
      title:
        "Are there educational materials or programs available on the website?",
      description:
        "Yes, we offer various educational materials and programs. These include workshops, tutorials, and resources for educators to integrate art and sports into their curriculum. Check out our 'Education' section on our main ICAF website for more details.",
    },
    {
      title: "Can I volunteer with #MyFavoriteSport?",
      description:
        "Absolutely! We're always looking for passionate individuals to join our team. Whether you're interested in helping out at events, contributing to our online content, or assisting in community outreach, we have a variety of volunteer opportunities available. Visit our 'Volunteer' section to learn more and sign up.",
      buttons: [
        {
          href: "https://icaf.org/join-us/volunteers",
          classNames: [
            "group",
            "w-fit",
            "h-fit",
            "rounded-md",
            "text-center",
            "py-3.5",
            "px-4",
            "text-sm",
            "tracking-wide",
            "bg-new-blue",
            "text-neutral-white",
          ],
          children: ["Volunteer"],
        },
      ],
    },
    {
      title: "How is the artwork showcased on the website?",
      description:
        "Artwork submitted to our competitions is displayed in our online gallery. This space allows artists to showcase their work to a global audience. We feature a variety of art forms, each inspired by the themes of sports and the Olympic spirit.",
    },
    {
      title: "How can I delete my account?",
      description:
        "If you wish to delete your account, you can do so in the 'Account Settings' section of your profile. Please note that deleting your account is irreversible and will remove all your data from our platform.",
    },
    {
      title:
        "Do I retain the rights to my artwork after submitting it to a competition?",
      description:
        "Yes, you retain the rights to your artwork. By submitting your work to our competitions, you grant us a license to display your artwork on our website and in related promotional materials, but you still own the rights to your work.",
    },
    {
      title: "What should I consider before submitting my artwork?",
      description:
        "Before submitting your artwork, please ensure it adheres to our competition theme and meets our submission guidelines regarding format, size, and content. We encourage originality and creativity, and all submissions should be your own work.",
    },
    {
      title: "Can I edit my submission after it's been uploaded?",
      description:
        "Once submitted, entries cannot be edited. Please review your artwork carefully before submitting it. If you need to make a crucial change, contact us, and we'll assist you depending on the stage of the competition.",
    },
    {
      title: "How do I get updates on the status of my competition entry?",
      description:
        "Updates regarding competition entries, including notifications about selection, will be communicated via the email you used to register on our site. Additionally, you can check the status of your entry and votes in your account dashboard under 'My Submissions.'",
    },
    {
      title: "What happens if I win the competition?",
      description:
        "If you are a competition winner, you will be notified via email with details about your prize and any next steps.",
    },
    {
      title: "Can I withdraw my artwork from the competition?",
      description:
        "If you wish to withdraw your artwork from the competition, please contact us as soon as possible. Withdrawal requests are handled on a case-by-case basis and depend on the competition stage.",
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
  const [windowWidth, setWindowWidth] = useState(0);

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
  type SectionKey = keyof typeof sections;
  function displayText(key: SectionKey) {
    if (windowWidth > 500) {
      return `${key.charAt(0).toUpperCase() + key.slice(1)} (${
        sections[key].sections.length
      })`;
    } else {
      return `${key.charAt(0).toUpperCase() + key.slice(1)}`;
    }
  }

  return (
    <>
      <section className="relative z-20 mt-10 overflow-x-visible m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20 pb-12">
        <div className="text-nowrap flex flex-row gap-x-6 sm:gap-x-10 z-10 border-b-4 overflow-x-auto ">
          {(Object.keys(sections) as SectionType[]).map((key) => (
            <p
              key={key}
              className={`select-none cursor-pointer text-lg md:text-xl transition-color mb-2 px-1 Pm Pm-${key}
                    ${
            activeSection === key && transitioningSection !== key
              ? "text-new-blue font-bold " // Active and not transitioning
              : transitioningSection === key
                ? "text-gray-500 font-normal" // Transitioning
                : "text-default-color" // Neither active nor transitioning
            }`}
              onClick={() => handleSectionClick(key)}
            >
              {displayText(key)}
            </p>
          ))}
        </div>
        <div
          ref={underlineRef}
          className=" bg-new-blue absolute hidden xsm:block h-[3px] -mt-[3px] z-0 rounded-lg w-32"
        ></div>
        {/* Current item indicators */}
        <div className="block md:hidden mt-6 mb-0 flex flex-row mx-[10%] md:mx-[0%] md:row-start-1 md:row-end-3 md:col-start-3 md:col-end-5 justify-center">
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
        </div>
        <div className=" w-full min-h-[400px] rounded-lg ">
          <div
            ref={containerRef}
            className="px-4 sm:px-10 py-0 max-w-unset overflow-hidden bg-transparent rounded-lg"
          >
            <ExpandingDiv {...sections[activeSection]} />
          </div>
        </div>
        <Image
          src={faqYelBlob}
          alt=""
          width={400}
          height={400}
          className="select-none pointer-events-none absolute -z-10 block top-60 -left-28 lg:scale-125"
        />
        <Image
          src={faqPinkBlob}
          alt=""
          width={500}
          height={500}
          className="select-none pointer-events-none sm:block sm:scale-100 sm:-right-48 md:-right-52 md:scale-100 lg:scale-125 absolute -z-10 block top-0 -right-80"
        />
      </section>
    </>
  );
};
