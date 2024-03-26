export const Confirmation = () => {
  return (
    <>
      <section className="items-center justify-center m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20 w-full lg:w-4/5 2xl:w-3/5">
        <p className="mt-28 mb-10 text-center text-2xl text-neutral-black font-bold">
          Congratulations!
        </p>
        <p className="mb-8 text-center text-base text-neutral-black font-normal"> 
          Your artwork is now submitted. We've sent a confirmation to your email with the submission details. 
        </p>
        <p className="mb-10 text-center text-base text-neutral-black font-normal"> 
          Your artwork is being reviewed, and will be posted to the gallery within 24 hours. Stay tuned for updates on the competition, and best of luck to you!
        </p>
      </section>
    </>
  );
};