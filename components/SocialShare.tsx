"use client";
import React, { useState } from "react";
import { FacebookIcon } from "./svgs/FacebookIcon";
import { TwitterIcon } from "./svgs/TwitterIcon";
import { WhatsappIcon } from "./svgs/WhatsappIcon";
import { LinkedinIcon } from "./svgs/LinkedinIcon";
import { ShareIcon } from "./svgs/ShareIcon";

interface SocialShareProps {
  shareId: string;
  center?: boolean;
}

const SocialShare: React.FC<SocialShareProps> = ({ shareId, center=false }) => {
  const [showCopiedPopup, setShowCopiedPopup] = useState(false);
  const baseUrl = `${window.location.protocol}//${window.location.host}/gallery/?id=${shareId}`;
  const shareUrl = new URL(baseUrl);
  const encodeUrl = encodeURIComponent(shareUrl.toString());

  const platforms = {
    Facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeUrl}`,
    WhatsApp: `https://wa.me/?text=${encodeUrl}`,
    X: `https://twitter.com/intent/tweet?url=${encodeUrl}`,
    LinkedIn: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeUrl}`,
  };
  
  const openPopup = (url: string) => {
    const width = 600;
    const height = 400;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    const opts = `status=1,width=${width},height=${height},top=${top},left=${left}`;
    window.open(url, "sharePopup", opts);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(baseUrl);
      setShowCopiedPopup(true);
      setTimeout(() => {
        setShowCopiedPopup(false);
      }, 1000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className={`${ center && "justify-center"} relative flex space-x-2 mt-4`}>
      <button onClick={copyToClipboard} className="text-white rounded-full flex items-center justify-center border-2 active:border-slate-300 active:scale-95">
        <ShareIcon width={32} height={32} />
      </button>
      {Object.entries(platforms).map(([name, url]) => (
        <button key={name} onClick={() => openPopup(url)} className="text-white rounded-full flex items-center justify-center border-2 active:border-slate-300 active:scale-95">
          {name === "Facebook" && <FacebookIcon width={32} height={32} />}
          {name === "WhatsApp" && <WhatsappIcon width={32} height={32} />}
          {name === "X" && <TwitterIcon width={32} height={32} />}
          {name === "LinkedIn" && <LinkedinIcon width={32} height={32} />}
        </button>
      ))}
      <div className={`absolute -top-14 z-10 bg-white border rounded p-2 px-4 transition-all ${showCopiedPopup ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <p>Link copied!</p>
      </div>
    </div>
  );
};

export default SocialShare;
