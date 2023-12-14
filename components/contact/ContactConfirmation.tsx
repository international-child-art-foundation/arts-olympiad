import {H2m} from "../common/texts/H2m";
import {Pm} from "../common/texts/Pm";
import {ButtonStyledLink} from "../common/ui/ButtonStyledLink";
import {LazyImage} from "../common/images/LazyImage";
import Image from "next/image";

export const ContactConfirmation = () => {
  return (
    <article className="p-10 xl:p-20 flex flex-col lg:flex-row border-1 border-black rounded-xl relative z-10 bg-neutral-white">
      <LazyImage imageUrl="/svgs/icaf-logo.svg" alt="ICAF Logo." className="mx-auto my-8 lg:hidden max-w-[80%] md:max-w-[50%]" />
      <div className="flex flex-col xl:ml-12 md:ml-20">
        <Image
          src="/contact/vertical-arrow.svg" alt=""
          width={50} height={50}
          className="absolute left-12 hidden md:block"
        />
        <H2m>We’ve got your message!</H2m>
        <Pm className="mt-8">
        Thank you for reaching out to us. Your query is important, and we're on it. Our team is currently reviewing your message and will get back to you as soon as possible. In the meantime, feel free to browse our [FAQ section] or continue exploring our website.
        </Pm>
        <div className="flex flex-row mt-8">
          <ButtonStyledLink target="_self" className={"mr-8"} href="/">Back home</ButtonStyledLink>
          <ButtonStyledLink target="_self" href="/" textColor="dark-blue" backGroundColor="neutral-white" >
          View FAQ’s
          </ButtonStyledLink>
        </div>
      </div>
      <LazyImage imageUrl="/svgs/icaf-logo.svg" alt="ICAF Logo." className="my-auto mx-8 hidden lg:block min-w-[30%]" />
    </article>
  );
};