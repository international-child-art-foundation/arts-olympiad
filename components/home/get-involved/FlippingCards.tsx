"use client";
import React, {useEffect, useState} from "react";
import {FlippingCard} from "./FlippingCard";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import monitorUp from "../../../public/svgs/monitor-up.svg";
import vote from "../../../public/svgs/vote.svg";
import heart from "../../../public/svgs/heart-handshake.svg";
import clipboard from "../../../public/svgs/clipboard-edit.svg";
import littleHeart from "../../../public/home/get-involved/heart.svg";
import upload from "../../../public/home/get-involved/upload.svg";
import Image from "next/image";
import {ButtonStyledLink} from "../../common/ui/ButtonStyledLink";

export const FlippingCards = () => {

  const [touchScreenPrimary, setTouchScreenPrimary] = useState(false);
  const { windowWidth } = useWindowDimensions();
  const areFlippable = windowWidth >= 768;

  // Determines if user device has touch screen as primary input device. Should work for phones and tablets.
  useEffect(() => {
    const hasTouchScreen = () => {
      return window.matchMedia("(pointer: coarse)").matches;
    };

    if (hasTouchScreen()) {
      setTouchScreenPrimary(true);
      console.log("Touchscreen device detected");
    } else {
      setTouchScreenPrimary(false);
    }

  }, []);

  return (
    <div className="z-10 md:grid grid-cols-2 grid-rows-2 gap-4 mt-6 card-grid" >
      <FlippingCard
        touchScreenPrimary={touchScreenPrimary}
        isFlippable={areFlippable}
        heading1="Share"
        heading2="Artists, ages 10-20: Share your creations!"
        description="Unleash your creativity! Upload and share your artwork with the world. Join a community of young artists making their mark."
        icon={monitorUp}
        color="#EE2F4D"
      />
      <FlippingCard
        touchScreenPrimary={touchScreenPrimary}
        isFlippable={areFlippable}
        heading1="Vote"
        heading2="For your favorite artwork"
        description="Channel your inner art critic and support the best creations. Celebrate boundless creativity with us – be a judge and champion young-at-heart artists!"
        icon={vote}
        color="#FBB22E"
      />
      <FlippingCard
        touchScreenPrimary={touchScreenPrimary}
        isFlippable={areFlippable}
        heading1="Support"
        heading2="Your support changes lives"
        description="Join us in championing children's causes through charitable donations."
        icon={heart}
        color="#168C39"
      >
        <ButtonStyledLink className="my-1"
          href={"https://www.icaf.org/donate"}
          onTouchStart={(e: React.TouchEvent<HTMLAnchorElement>) => { e.stopPropagation();}}
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => { e.stopPropagation();}}
        >
          <Image className="mr-2" src={littleHeart} alt="" width={24} height={24} />
          Donate now
        </ButtonStyledLink>
      </FlippingCard>
      <FlippingCard
        touchScreenPrimary={touchScreenPrimary}
        isFlippable={areFlippable}
        heading1="Register"
        heading2="For free"
        description="Join us to upload your art or vote – it's easy and completely free!"
        icon={clipboard}
        color="#0286C3"
      >
        <ButtonStyledLink
          href={"/auth/register"}
          className="my-1"
          onTouchStart={(e: React.TouchEvent<HTMLAnchorElement>) => { e.stopPropagation();}}
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => { e.stopPropagation();}}
        >
          <Image className="mr-2" src={upload} alt="" width={24} height={24} />
          Register here
        </ButtonStyledLink>
      </FlippingCard>
    </div>
  );
};