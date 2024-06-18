import { useStepsContext } from "./StepsContext";

export const Age = () => {
  const { setIsUnder18, handleNavigation } = useStepsContext();

  const handleAgeClick = (direction: string) => {
    if (direction === "under") {
      setIsUnder18(true);
    } else if (direction === "over") {
      setIsUnder18(false);
    }
    handleNavigation(direction);
  };

  return (
    <>
      <section className="justify-around sm:items-center sm:justify-center m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20 w-fit lg:w-4/5 2xl:w-3/5 min-w-fit sm:min-w-[640px]">
        <div className="mt-28 mb-9 text-center text-2xl text-neutral-black font-bold">
          Welcome [User Name]!
        </div>
        <p className="mb-1 text-center text-base text-neutral-black font-normal"> 
          Let's get your artwork ready for the world. 
        </p>
        <p className="mb-9 text-center text-base text-neutral-black font-normal"> 
          First, how old are you? 
        </p>
      </section>
      <div className="px-8 pt-8 justify-around mx-auto w-fit mb-16 sm:flex">
        <button type="button" className= "border rounded text-center text-base font-normal w-full md:w-fit py-4 px-10 ms-auto mx-0 sm:mr-5 bg-neutral-white text-new-blue border-new-blue cursor-pointer" onClick={() => handleAgeClick("under")}>
          Under 18
        </button>
        <button type="button" className="border rounded text-center text-base font-normal w-full md:w-fit py-4 px-10 me-auto mx-0 sm:ml-5 mt-4 sm:mt-0 bg-neutral-white text-new-blue border-new-blue cursor-pointer" onClick={() => handleAgeClick("over")}>
          Over 18
        </button>
      </div>

    </>
  );
};