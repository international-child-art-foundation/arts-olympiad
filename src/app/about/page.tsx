import ContentContainer from "../../../components/ui/ContentContainer";
import Image from "next/image";
import groupImage from "../../../public/about/about.png";
import icon1 from "../../../public/about/icon1.png";
import icon2 from "../../../public/about/icon2.png";
import icon3 from "../../../public/about/icon3.png";
import icon4 from "../../../public/about/icon4.png";
import linkIcon from "../../../public/about/link.png";
import { link } from "fs";

export default function aboutPage() {
  return (
    <div>
      {/* Title block */}
      <div className="w-full h-40 flex items-center pl-6">
        <h1 className="mb-2 mt-0 text-3xl font-medium leading-6 ml-12 text-primary">About ICAF</h1>
      </div>

      <Image 
        src={groupImage}
        className="w-full h-auto" 
        alt="Group of children holding up art pieces in the national mall." 
      />
      {/* 4 content containers */}
      <div className="flex flex-col items-center bg-secondary-blue">
        <ContentContainer>
          <div className="w-1/5 mb-6 ml-2 mt-4">
            <Image 
              src={icon1}
              alt="icon1.png"
            />
          </div>
          <div className="w-5/6">
            <p className="text-base lg:text-lg">Founded in 1997, the International Child Art Foundation (ICAF) serves American children as their national arts organization and the world's children as their global arts organization.</p>
          </div>
        </ContentContainer>
        <ContentContainer>
          <div className="w-1/5 mb-6 ml-2 mt-4">
            <Image 
              src={icon2}
              alt="icon2.png"
            />
          </div>
          <div className="w-5/6">
            <p className="text-base lg:text-lg">ICAF believes that children's art is arguably the most honest and pure form of human creative expression. Children worldwide produce original works of art for ICAF, and their masterpieces ICAF exhibits at prominent venues, including at The National Mall across the U.S. Capitol at the World Children's Festival, produced quadrennially by ICAF as the "Olympics" of children's imagination.</p>
          </div>
        </ContentContainer>
        <ContentContainer>
          <div className="w-1/5 mb-6 ml-2 mt-4">
            <Image 
              src={icon3}
              alt="icon3.png"
            />
          </div>
          <div className="w-5/6">
            <p className="text-base lg:text-lg">ICAF is grateful to the United States Olympic Committee for granting it an exclusive license to use the "Arts Olympiad" mark.</p>
          </div>
        </ContentContainer>
        <ContentContainer>
          <div className="w-1/5 mb-6 ml-2 mt-4">
            <Image 
              src={icon4}
              alt="icon4.png"
            />
          </div>
          <div className="w-5/6">
            <p className="text-base lg:text-lg">To integrate Art and Sport with STEM disciplines, ICAF has pioneered STEAMS education for children's holistic development.</p>
          </div>
        </ContentContainer>
        <div className="w-11/12 lg:w-3/5 mt-20 mb-2">
          <h1 className="text-2xl font-semibold leading-6 ml-2 text-primary mb-5">For more:</h1>
          <p className="flex flex-col lg:flex-row lg:space-x-40 space-y-2 lg:space-y-0">
            <a href="https://icaf.org/" className="text-base inline-flex ml-2">
              <u>International Child Art Foundation</u>
              <Image 
                src={linkIcon}
                className="ml-2"
                alt="Icon denoting a hyperlink" 
              />
            </a>
            <a href="https://worldchildrensfestival.org/" className="text-base inline-flex ml-2">
              <u>The World Children's Festival</u>
              <Image 
                src={linkIcon}
                className="ml-2" 
                alt="Icon denoting a hyperlink" 
              />
            </a>
          </p>
        </div>
      </div>
    </div>

  );
}