"use client";

import { useState } from "react";
import Popup from "./Popup";
import { StepsProvider } from "./StepsContext";

export default function Modal() {
  const [isPopUp, setIsPopUp] = useState(false);

  return (
    <>
      <div className="mt-40 mb-40 grid gap-y-2">
        <button onClick={() => setIsPopUp(true)} className={`mx-auto tracking-widest w-fit h-fit py-4 px-6 border-new-blue border rounded text-base font-normal cursor-pointer text-new-blue z-30 ${isPopUp ? "hidden" : ""}`}>
          Modal Systems
        </button>
        <StepsProvider>
          <Popup trigger={isPopUp} setTrigger={setIsPopUp}>
          </Popup>
        </StepsProvider>
      </div>

    </>
  );
}