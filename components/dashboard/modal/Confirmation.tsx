import { FormikValidatedStepsControl } from "./FormikValidatedStepsControl";
import SocialShare from "../../SocialShare";
import { useDashboardContext } from "../DashboardContext";

export const Confirmation = () => {
  const { apiUserData } = useDashboardContext();
  return (
    <>
      <section className="items-center justify-center m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20 w-full">
        <p className="mt-28 mb-4 text-center text-2xl text-neutral-black font-bold">
          Congratulations! 
        </p>
        <p className="mb-10 text-xl text-center text-neutral-black font-bold">
          Your artwork has been submitted.        
        </p>
        <p className="mb-10 text-base text-neutral-black font-normal"> 
          Your artwork is being reviewed, and will soon be posted to the public gallery. Stay tuned for updates on the competition, and best of luck to you!
        </p>
        {apiUserData && apiUserData.sk && 
        <div className="">
          <p className="font-semibold text-center">Share your creation with your friends</p>
          <SocialShare shareId={apiUserData.sk} center={true}/>
        </div>
        }
        <FormikValidatedStepsControl />
      </section>
    </>
  );
};