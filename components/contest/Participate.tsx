export const Participate = () => {
  return (
    <>
      <div className="relative py-32 z-20 bg-light-blue px-8 md:px-12 lg:px-16 xl:px-20" >
        <div className="grid grid-cols-1 gap-y-12 m-auto max-w-screen-2xl sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <h2 className="text-center font-medium text-3xl font-montserrat">Ready to participate?</h2>
          {/* <h3 className="text-center text-lg leading-loose font-regular">We will gladly answer any questions you have.</h3>     */}
          <a href="https://icaf.org/about/contact-us" className="mx-auto inline-flex w-fit h-fit bg-new-blue rounded text-center py-4 px-6 text-sm cursor-pointer tracking-wide text-neutral-white">Create my account</a>
        </div>
      </div>
    </>
  );
};