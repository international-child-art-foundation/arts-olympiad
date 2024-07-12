import "../../styles/home.css";
import "../../styles/animated-arrows.css";
import { Metadata } from "next";
import { sharedOpenGraph } from "../shared-metadata";
import { FaqHeader } from "../../../components/faq/FaqHeader";
import { FaqSubheader } from "../../../components/faq/FaqSubheader";
import { FaqDropdowns } from "../../../components/faq/FaqDropdowns";
import { Banner } from "../../../components/Banner";
import icafLogo from "../../../public/svgs/Icaf-logo.svg";


export const metadata: Metadata = {
  title: "Olympic Games for Kids: My Favorite Sport Contest FAQ",
  description: "Have questions about the My Favorite Sport contest? Find answers to frequently asked questions about eligibility, submission guidelines, judging criteria, and more.",
  openGraph: {
    ...sharedOpenGraph,
    title: "FAQ | My Favorite Sport",
  }
};

export default function FAQPage() {
  return (
    <div className="overflow-hidden z-0 mx-auto w-screen">
      <FaqHeader/>
      <FaqSubheader/>
      <FaqDropdowns/>
      <Banner 
        backgroundColor="light-blue"
        title="Can’t find what you are looking for?" 
        description="Still have questions or need personalized assistance? Our dedicated team is ready to help you with any inquiries or special requests you might have, so please don't hesitate to reach out to us through our 'Contact Us' page." 
        img={icafLogo}
        buttons={[
          {
            href: "https://icaf.org/about/contact-us", 
            text: "Contact Us",
            icon: <></>,
            className: "group bg-new-blue rounded text-center text-sm cursor-pointer tracking-wide text-neutral-white w-36"
          },
        ]}
      />
    </div>      
  );
}
