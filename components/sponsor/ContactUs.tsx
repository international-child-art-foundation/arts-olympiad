
export const ContactUs = () => {
  return (
    <>
      <div className="relative z-30 bg-light-blue mt-20 xsm:py-8 md:py-12 lg:py-16 xl:py-20" >
        <div className="relative mx-auto grid grid-cols-1 gap-y-3 max-w-screen-2xl sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <h2 className="text-center font-medium text-3xl">Contact Us</h2>
          <h3 className="text-center font-light text-lg leading-loose">We will gladly answer any questions you have.</h3>    
          <a href="https://icaf.org/about/contact-us" className="mx-auto inline-flex w-fit h-fit bg-new-blue rounded text-center py-4 px-6 text-sm cursor-pointer tracking-wide text-neutral-white">Contact us here</a>
        </div>
      </div>
    </>
  );
};