import Image from "next/image";
import hashtag from "../../public/home/hashtag.svg";
import FaqHeaderImage from "../../public/svgs/faq-svg/faq-hero.svg"
import FaqHeaderImage2 from "../../public/svgs/faq-svg/faq-hero-2.svg"
import FAQMobileHeaderBlob from "../../public/svgs/faq-svg/mobile-header-blob.svg";
import FAQIpadTabletHeaderBlob from "../../public/svgs/faq-svg/ipad-tablet-header-blob.svg";
import DesktopHeaderBlob from "../../public/svgs/faq-svg/desktop-header-blob.svg"

export const FaqHeader = () => {
    return (
        <>
            <div className="">
                <Image src={FAQMobileHeaderBlob} alt="" className="select-none pointer-events-none absolute sm:hidden -top-2 sm:-top-132 md:-top-140 w-screen h-3/5" /> 
                <Image src={FAQIpadTabletHeaderBlob} alt="" className="select-none pointer-events-none absolute hidden sm:block lg:hidden -z-10 -top-56 w-full h-full" /> 
                <Image src={DesktopHeaderBlob} alt="" className="select-none pointer-events-none absolute hidden lg:block xl:-top-80 2xl:-top-100 4xl:-top-120 -z-10 -top-64 w-full h-[1000px]" /> 

            </div>
            <section className="relative grid sm:grid-cols-2 z-20 mt-10 m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20">
                <div className="sm:col-span-1 md:mt-8">
                    <div className="z-20 flex flex-row align-center ">
                        <Image src={hashtag} alt="" width={32} height={32}  />
                        <h1 className="z-20 break-words font-semibold text-3xl xsm:text-4xl lg:text-5xl xl:text-6xl">
                            MyFavoriteSport<span className="sr-only">.</span>
                        </h1>
                    </div>
                    <h1 className="flex-col z-20 font-semibold mb-4 text-3xl xsm:text-4xl lg:text-5xl xl:text-6xl">
                        FAQ's
                    </h1>
                    <p className="font-light leading-8">Discover, create and celebrate the Olympic spirit in your artistic expression.</p>
                </div>

                <div className="z-20 sm:col-span-1 flex justify-center sm:justify-end items-center">            
                    <Image src={FaqHeaderImage} className="hidden sm:block w-3/4 sm:w-10/12 md:w-3/4 sm:ml-10 lg:ml-0 md:w-3/4" alt="photo" />
                    <Image src={FaqHeaderImage2} className="block sm:hidden w-3/4 sm:w-10/12 md:w-3/4 sm:ml-10 lg:ml-0 md:w-3/4" alt="photo" />
                </div>
            </section>
        </>
    )
}