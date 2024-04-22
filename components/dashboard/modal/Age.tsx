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
      <section className="items-center justify-center m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20 w-full lg:w-4/5 2xl:w-3/5">
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
      <div className="flex">
        <button type="button" className= "border rounded text-center text-base font-normal w-full md:w-fit py-4 px-10 ms-auto mr-5 bg-neutral-white text-new-blue border-new-blue cursor-pointer" onClick={() => handleAgeClick("under")}>
          Under 18
        </button>
        <button type="button" className="border rounded text-center text-base font-normal w-full md:w-fit py-4 px-10 me-auto ml-5 bg-neutral-white text-new-blue border-new-blue cursor-pointer" onClick={() => handleAgeClick("over")}>
          Over 18
        </button>
      </div>

    </>
  );
};