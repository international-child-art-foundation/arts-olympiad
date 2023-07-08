import ContentContainer from "../../../components/ui/ContentContainer";
import Image from "next/image";

export default function aboutPage() {
  return (
    <div>
      {/* Title block */}
      <div className="w-full h-40 flex items-center pl-6">
        <h1 className="mb-2 mt-0 text-3xl font-medium leading-6 ml-12 text-primary">About ICAF</h1>
      </div>

      <Image 
        src="/about/about.png" 
        width = {1440}
        height = {621}
        className="w-full h-auto" 
        alt="Group of children holding up art pieces in the national mall." 
      />
      {/* 4 content containers */}
      <div className="flex flex-col items-center bg-secondary-blue">
        <ContentContainer>
          <Image 
            height = {80}
            width = {80}
            src="/about/icon1.png" 
            className="w-auto h-auto max-w-[100px] max-h-[100px] mb-6 md:mb-0 md:mr-6" 
            alt="Artistic depection of a person with black hair and a multi-colored shirt."
          />
          <div>
            <p className="text-base lg:text-lg">Founded in 1997, the International Child Art Foundation (ICAF) serves American children as their national arts organization and the world's children as their global arts organization.</p>
          </div>
        </ContentContainer>
        <ContentContainer>
          <Image 
            height = {80}
            width = {81}
            src="/about/icon2.png" 
            className="w-auto h-auto max-w-[100px] max-h-[100px] mb-6 md:mb-0 md:mr-6" 
            alt="Artistic depection of a robot holding a wrench."
          />
          <div>
            <p className="text-base lg:text-lg">ICAF believes that children's art is arguably the most honest and pure form of human creative expression. Children worldwide produce original works of art for ICAF, and their masterpieces ICAF exhibits at prominent venues, including at The National Mall across the U.S. Capitol at the World Children's Festival, produced quadrennially by ICAF as the "Olympics" of children's imagination.</p>
          </div>
        </ContentContainer>
        <ContentContainer>
          <Image 
            height = {80}
            width = {80}
            src="/about/icon3.png" 
            className="w-auto h-auto max-w-[100px] max-h-[100px] mb-6 md:mb-0 md:mr-6" 
            alt="Artistic depection of a person with yellow hair and a brown dress."
          />
          <div>
            <p className="text-base lg:text-lg">ICAF is grateful to the United States Olympic Committee for granting it an exclusive license to use the "Arts Olympiad" mark.</p>
          </div>
        </ContentContainer>
        <ContentContainer>
          <Image 
            width = {80}
            height = {80}
            src="/about/icon4.png" 
            className="w-auto h-auto max-w-[100px] max-h-[100px] mb-6 md:mb-0 md:mr-6" 
            alt="Artistic depection of a person with an arm sling."  
          />
          <div>
            <p className="text-base lg:text-lg">To integrate Art and Sport with STEM disciplines, ICAF has pioneered STEAMS education for children's holistic development.</p>
          </div>
        </ContentContainer>
        <div className="w-11/12 lg:w-3/5 mt-20 mb-2">
          <h1 className="text-2xl font-semibold leading-6 ml-2 text-primary mb-5">For more:</h1>
          <p className="flex flex-col lg:flex-row lg:space-x-40 space-y-2 lg:space-y-0">
            <a href="https://icaf.org/" className="text-base inline-flex ml-2">
              <u>International Child Art Foundation</u>
              <Image 
                width = {23}
                height = {23}
                src="/about/link.png" 
                className="ml-2"
                alt="Icon denoting a hyperlink" 
              />
            </a>
            <a href="https://worldchildrensfestival.org/" className="text-base inline-flex ml-2">
              <u>The World Children's Festival</u>
              <Image 
                width = {23}
                height = {23}
                src="/about/link.png" 
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