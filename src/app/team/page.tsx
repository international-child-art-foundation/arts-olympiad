import ContentContainer from "../../../components/ui/ContentContainer";
import Link from "next/link";

export default function page() {
  return (
    <div>
      {/* Title block */}
      <div className="w-full h-40 flex items-center pl-6 bg-secondary-blue">
        <h1 className="mb-2 mt-0 text-3xl font-medium leading-6 sm:ml-12 text-primary">Meet Our Team</h1>
      </div>
      {/* 2 lateral content containers*/}
      <div className="bg-secondary-blue flex flex-col sm:flex-row justify-evenly gap-4 px-4 " >
        <ContentContainer>
          <div className="self-start">
            <h2 className="text-base lg:text-2xl font-medium">Project Director</h2>
            <ul>
              <li className="text-base lg:text-lg">Ashfaq Ishaq, Ph.D.
                <Link href="https://www.linkedin.com/in/ashfaqishaq/" className="ml-3">
                  <img src="/team/icon-linkedin.svg" alt="LinkedIn company logo" className="inline-block h-6 w-6" />
                </Link>
              </li>
            </ul>
            <h2 className="text-base lg:text-2xl font-medium">Director, Community Relations</h2>
            <ul>
              <li className="text-base lg:text-lg">Katty Guerami
                <Link href="https://www.linkedin.com/in/katty-guerami-74a99014/" className="ml-3">
                  <img src="/team/icon-linkedin.svg" alt="LinkedIn company logo" className="inline-block h-6 w-6" />
                </Link>
              </li>
            </ul>
            <h2 className="text-base lg:text-2xl font-medium">ICAF Paris</h2>
            <ul>
              <li className="text-base lg:text-lg">Katherine Harold, Paris College of Art
                <Link href="https://www.linkedin.com/in/katherine-harold-23a5a0137/" className="ml-3">
                  <img src="/team/icon-linkedin.svg" alt="LinkedIn company logo" className="inline-block h-6 w-6" />
                </Link>
              </li>
            </ul>
          </div>
        </ContentContainer>
        <ContentContainer>
          <div className="self-start">
            <h2 className="text-base lg:text-2xl font-medium">Legal Advisors</h2>
            <ul>
              <li className="text-base lg:text-lg">Oroma Womeodu, Esq.</li>
              <li className="text-base lg:text-lg">Jade Monkouopm</li>
            </ul>
          </div>
        </ContentContainer>
      </div>
      {/* 3 lateral content containers*/}
      <div className="bg-secondary-blue flex flex-col sm:flex-row justify-evenly gap-4 px-4 pb-4">
        <ContentContainer>
          <div className="self-start">
            <h2 className="text-base lg:text-2xl font-medium">UX/UI</h2>
            <ul>
              <li className="text-base lg:text-lg">Liang-Yu Su</li>
              <li className="text-base lg:text-lg">Claire Chen</li>
              <li className="text-base lg:text-lg">Jaishri Chourasia</li>
            </ul>
          </div>
        </ContentContainer>
        <ContentContainer>
          <div className="self-start">
            <h2 className="text-base lg:text-2xl font-medium">Web Development</h2>
            <ul>
              <li className="text-base lg:text-lg">Andrew Dame</li>
              <li className="text-base lg:text-lg">Chuck Gooley</li>
              <li className="text-base lg:text-lg">Isaac Best</li>
              <li className="text-base lg:text-lg">Patrick Feliciano</li>
              <li className="text-base lg:text-lg">Rocky Wang</li>
            </ul>
          </div>
        </ContentContainer>
        <ContentContainer>
          <div className="self-start">
            <h2 className="text-base lg:text-2xl font-medium">Data Science</h2>
            <ul>
              <li className="text-base lg:text-lg">Yiping Lu</li>
            </ul>
          </div>
        </ContentContainer>
      </div>
      {/* yellow section */}
      <div className="w-full h-40 flex items-center pl-6 bg-main-yellow">
        <h1 className="mb-2 mt-0 text-3xl font-medium leading-6 text-primary sm:ml-12 ">Advisory Committee</h1>
      </div>
      {/* content container image row NOTE: the Advisory committe links are not populated yet*/}
      <div className="flex flex-col sm:flex-row justify-evenly gap-4 px-4 bg-main-yellow">
        <div className="basis-1/2">
          <ContentContainer>
            <div className="self-start">
              <ul>
                <li className="text-base lg:text-lg">
                  Joe Addo
                  <Link href="https://www.joeaddo.com/" target="_blank" className="ml-3">
                    <img src="/team/icon-link.svg" alt="Two chains interlinked" className="inline-block h-6 w-6" />
                  </Link>
                </li>
                <li className="text-base lg:text-lg">
                  Michael Shetzer
                  <Link href="https://ceesmena.org/michael-shetzer/" target="_blank" className="ml-3">
                    <img src="/team/icon-link.svg" alt="Two chains interlinked" className="inline-block h-6 w-6" />
                  </Link>
                </li>
              </ul>
            </div>
          </ContentContainer>
        </div>
        <div className="basis-1/2">
          <img src="/team/illustration-01.svg" alt="Three people forming a huddle"/>
        </div>
      </div>
    </div>
  );
}