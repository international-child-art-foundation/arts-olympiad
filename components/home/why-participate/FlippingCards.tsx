"use client";
import {FlippingCard} from "./FlippingCard";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import monitorUp from "../../../public/svgs/monitor-up.svg";
import vote from "../../../public/svgs/vote.svg";
import heart from "../../../public/svgs/heart-handshake.svg";
import clipboard from "../../../public/svgs/clipboard-edit.svg";
import littleHeart from "./heart.svg";
import upload from "./upload.svg";
import {ButtonStd} from "../../common/ui/ButtonStd";
import Image from "next/image";

export const FlippingCards = () => {

  const { width } = useWindowDimensions();
  const areFlippable = width >= 768;

  return (
    <div>
      <FlippingCard
        isFlippable={areFlippable}
        heading1="Share"
        heading2="Artists, ages 10-20: Share your creations!"
        description="Unleash your creativity! Upload and share your artwork with the world. Join a community of young artists making their mark."
        icon={monitorUp}
        color="#EE2F4D"
      />
      <FlippingCard
        isFlippable={areFlippable}
        heading1="Vote"
        heading2="For your favorite artwork"
        description="Channel your inner art critic and support the best creations. Celebrate boundless creativity with us – be a judge and champion young-at-heart artists!"
        icon={vote}
        color="#FBB22E"
      />
      <FlippingCard
        isFlippable={areFlippable}
        heading1="Support"
        heading2="Your support changes lives"
        description="Join us in championing children's causes through charitable donations."
        icon={heart}
        color="#168C39"
      >
        <ButtonStd className="my-1">
          <Image className="mr-2" src={littleHeart} alt="" width={24} height={24} />
          Donate now
        </ButtonStd>
      </FlippingCard>
      <FlippingCard
        isFlippable={areFlippable}
        heading1="Register"
        heading2="For free"
        description="Join us to upload your art or vote – it's easy and completely free!"
        icon={clipboard}
        color="#0286C3"
      >
        <ButtonStd className="my-1">
          <Image className="mr-2" src={upload} alt="" width={24} height={24} />
          Register here
        </ButtonStd>
      </FlippingCard>

    </div>
  );
};