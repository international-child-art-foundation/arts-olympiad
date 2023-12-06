import Image from "next/image";
import {AnimatedScribble} from "../../components/common/decorations/AnimatedScribble";

export const Process = () => {
  return (
    <>
      <div className="relative z-20 mt-40 m-auto max-w-screen-2xl px-8 md:px-12 lg:px-16 xl:px-20">

        <div className="grid grid-cols-2">
          <div className="lg:hidden col-span-2">
            <p className="mb-5 text-3xl font-bold">Submission Process Overview</p>
            <p className="mb-8 test-base font-light">To submit your artwork, you need to create an account on our website. Once logged in, you can upload your artwork and provide the necessary information including the title, description, and artist's statement.</p>
          </div>

          <Image src="/laptop.webp" width = {704} height = {482} className="rounded-xl w-full h-full col-span-2 lg:col-span-1 pr-10" alt="laptop" />
          
          <article className="col-span-2 lg:col-span-1">
            <div className="border-main-orange border-l-8 hidden lg:block">
              <p className="ml-6 w-max text-3xl font-bold">Submission Process Overview</p>
              <AnimatedScribble width={140} smwidth={90} className="stroke-main-orange ml-96" />
              <p className="ml-6 test-base font-light">To submit your artwork, you need to create an account on our website. Once logged in, you can upload your artwork and provide the necessary information including the title, description, and artist's statement.</p>
            </div>
            <ol className="list-decimal ml-7 lg:ml-14 mt-8 lg:mt-14">
              <li className="text-2xl font-bold" >Create an Account</li>
              <p className="font-light text-base mb-8 mt-4">To get started, click on the 'Sign Up' button on our website and follow the instructions to create your account. It only takes a few minutes!</p>
              <li className="text-2xl font-bold" >Upload Your Artwork</li>
              <p className="font-light text-base mt-4">Once you have an account, you can easily upload your artwork by clicking on the 'Upload' button. Make sure to follow the guidelines for file format and size.</p>
            </ol>
          </article>
        </div>
        
        <div className="grid grid-cols-2 mt-16 lg:mt-32">

          <div className="col-span-2 lg:hidden">
            <p className="mb-5 text-3xl font-bold">Submission Guidelines and Formats</p>
            <p className="mb-8 test-base font-light">We accept different formats, including paintings, drawings, and digital art. Your creativity knows no bounds!  Upload your work in JPEG or PNG.</p>
          </div>

          <article className="col-span-2 lg:col-span-1 order-2 lg:order-1">
            <div className="border-main-orange border-l-8 hidden lg:block">
              <p className="ml-6 w-max text-3xl font-bold">Submission Guidelines and Formats</p>
              <AnimatedScribble width={140} smwidth={90} className="stroke-main-orange ml-[450px]" />
              <p className="ml-6 test-base font-light">We accept different formats, including paintings, drawings, and digital art. Your creativity knows no bounds!  Upload your work in JPEG or PNG.</p>
            </div>
            <ol className="list-decimal ml-7 lg:ml-14 mt-8 lg:mt-144">
              <li className="text-2xl font-bold" >Size Restrictions</li>
              <p className="font-light text-base mb-8 mt-4">Artwork size should not exceed 10MB to ensure proper display and evaluation during the competition. Recommended size is 1920x1080 pixels.</p>
              <li className="text-2xl font-bold" >Originality Requirements</li>
              <p className="font-light text-base mb-8 mt-4">We want everyone's art to be fresh and original! So, if we find art that looks too much like someone else's, we might have to take it down. Remember, it's always best to add your unique twist to everything you create to avoid any copyright problems.</p>
              <li className="text-2xl font-bold" >AI Art</li>
              <p className="font-light text-base mb-8 mt-4">Yes, we do accept AI artwork.  However, this must be clearly indicated in your submission on what tools you used to create your artwork to ensure fair judgment.</p>
            </ol>
          </article>
        
          <Image src="/rules.webp" width = {704} height = {482} className="rounded-xl w-full h-full col-span-2 lg:col-span-1 lg:pl-10 order-1 lg:order-2" alt="rules" />

        </div>
      </div>
    </>
  );
};