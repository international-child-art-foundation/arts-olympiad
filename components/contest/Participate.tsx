import Link from "next/link";
export const Participate = () => {
  return (
    <>
      <div className="relative py-16 z-40 bg-light-blue px-8 md:px-12 lg:px-16 xl:px-20" >
        <div className="grid grid-cols-1 gap-y-12 m-auto max-w-screen-2xl sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <h2 className="text-center font-medium text-3xl font-montserrat">Ready to participate?</h2>
          {/* <h3 className="text-center text-lg leading-loose font-regular">We will gladly answer any questions you have.</h3>     */}
          <Link href="/auth/register" className="mx-auto inline-flex w-fit h-fit bg-new-blue rounded text-center py-4 px-6 text-sm cursor-pointer tracking-wide text-neutral-white">Create my account</Link>
        </div>
      </div>
    </>
  );
};