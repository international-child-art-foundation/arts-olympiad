import ContentContainer from "../../../components/ui/ContentContainer";

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
          <div>
            <p className="text-base lg:text-2xl font-medium">Project Director</p>
            <p className="text-base lg:text-lg">Ashfaw Ishaw, Ph.D.</p>
            <p className="text-base lg:text-2xl font-medium">Director, Community Relations</p>
            <p className="text-base lg:text-lg">Katty Guerami</p>
            <p className="text-base lg:text-2xl font-medium">ICAF Paris</p>
            <p className="text-base lg:text-lg">Katherine Harold, Paris College of Art</p>
          </div>
        </ContentContainer>
        <ContentContainer>
          <div>
            <p className="text-base lg:text-2xl font-medium">Legal Advisors</p>
            <p className="text-base lg:text-lg">Oroma Womeodu, Esq.</p>
            <p className="text-base lg:text-lg">Jade Monkouopm</p>
          </div>
        </ContentContainer>
      </div>
      {/* 3 lateral content containers*/}
      <div className="bg-secondary-blue flex flex-col sm:flex-row justify-evenly gap-4 px-4 pb-4">
        <ContentContainer>
          <div>
            <p className="text-base lg:text-2xl font-medium">UX/UI</p>
            <p className="text-base lg:text-lg">Liang-Yu Su</p>
            <p className="text-base lg:text-lg">Claire Chen</p>
            <p className="text-base lg:text-lg">Jaishri Chourasia</p>
          </div>
        </ContentContainer>
        <ContentContainer>
          <div>
            <p className="text-base lg:text-2xl font-medium">Web Development</p>
            <p className="text-base lg:text-lg">Andrew Dame</p>
            <p className="text-base lg:text-lg">Chuck Gooley</p>
            <p className="text-base lg:text-lg">Isaac Best</p>
            <p className="text-base lg:text-lg">Patrick Feliciano</p>
            <p className="text-base lg:text-lg">Adel Soltane</p>
            <p className="text-base lg:text-lg">Rocky Wang</p>
          </div>
        </ContentContainer>
        <ContentContainer>
          <div>
            <p className="text-base lg:text-2xl font-medium">Data Science</p>
            <p className="text-base lg:text-lg">Yiping Lu</p>
            <p className="text-base lg:text-lg">Muwen Huang</p>
          </div>
        </ContentContainer>
      </div>
      {/* yellow section */}
      <div className="w-full h-40 flex items-center pl-6 bg-main-yellow">
        <h1 className="mb-2 mt-0 text-3xl font-medium leading-6 text-primary sm:ml-12 ">Advisory Committee</h1>
      </div>
      {/* content container image row */}
      <div className="flex flex-col sm:flex-row justify-evenly gap-4 px-4 bg-main-yellow">
        <div className="basis-1/2">
          <ContentContainer>
            <div>
              <p className="text-base lg:text-lg">Joe Addo</p>
              <p className="text-base lg:text-lg">Michael Shetzer</p>
            </div>
          </ContentContainer>
        </div>
        <div className="basis-1/2">
          <img src="/team/illustration-01.svg" alt="3 people forming a huddle"/>
        </div>
      </div>
    </div>
  );
}