import ContentContainer from "../../../components/ui/ContentContainer";
import Image from "next/image";

export default function page() {
  return (
    <div>
      {/* title */}
      <div className="bg-secondary-blue flex flex-row">
        <div className="bg-secondary-blue break-words font-semibold text-4xl pl-6 md:pl-20 pt-5 md:pt-10 mb-10">
          Purpose
        </div>
      </div>
      {/* engaging creative kids block */}
      <div className="bg-secondary-blue">
        <div className="bg-neutral-white rounded-2xl p-10 md:p-5 shadow-md flex flex-col md:flex-row items-start mx-auto w-11/12">
          {/* earth part */}
          <div className="flex flex-col items-center pt-0 md:pt-0 mb-20">
            <div className="break-words font-semibold text-3xl text-center md:text-left pl-6 md:pl-20 pt-5 md:pt-10 mb-10">
              Engaging Creative Kids in the Olympics
            </div>
            <Image className="w-3/5 h-auto" src="/purpose/icaf-2.png" alt="An earth-like human waving at you with a smile" width={174} height={174} />
          </div>
          {/* pie chart part */}
          <div className="flex flex-col items-center pt-0 md:pt-10 md:pl-20">
            <div className="break-words text-base text-center md:text-left mb-5 md:mb-0">
              A survey of 9,000 kids by a U.K. advertising company, KidsKnowBest, revealed that about 50% seemed uninterested in watching the Olympics.
            </div>
            <Image className="w-full h-auto md:mt-10 md:mr-10 hidden md:block" src="/purpose/chart-desktop.png" alt="A pie chart shows 50% of children are not interested in Olympics" width={174} height={174} />
            <Image className="w-full h-auto md:mt-10 md:mr-10 block md:hidden" src="/purpose/chart-mobile.png" alt="A pie chart shows 50% of children are not interested in Olympics" width={174} height={174} />
          </div>
        </div>
      </div>
    </div>
  );
}
