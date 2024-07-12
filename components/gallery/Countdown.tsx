"use client";
import React from "react";
import { useEffect, useState } from "react";
import countdownStyles from "@/styles/gallery.module.css";
import dates from "../../mock/dates";

export const Countdown = () => {
  const contestStartTime = new Date(dates.competitionBegin);
  contestStartTime.setHours(12, 0, 0);
  const contestEndTime = new Date(dates.competitionEnd);
  contestEndTime.setHours(23, 59, 59);
  const [endTime, setEndTime] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const now = new Date();

  useEffect(() => {
    const now = new Date();
    // Define a function to handle the countdown logic
    const updateCountdown = () => {
      const currentTime = new Date();
      const difference = target.getTime() - currentTime.getTime();
  
      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      setDays(d);
  
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      setHours(h);
  
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      setMinutes(m);
  
      const s = Math.floor((difference % (1000 * 60)) / 1000);
      setSeconds(s);
  
      if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
        if (target === contestStartTime) {
          target = contestEndTime;
        } else {
          setEndTime(true);
        }
      }
    };
  
    // Determine initial target time
    let target = now < contestStartTime ? contestStartTime : contestEndTime;
  
    // Run once immediately on mount
    updateCountdown();
  
    // Then set the interval
    const interval = setInterval(updateCountdown, 1000);
  
    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []); // Ensure the effect runs only once on mount
    
  return (
    <div className={`grid grid-row mx-auto ml-12 ${countdownStyles.countdownDisplayGrid} gap-4 lg:gap-8 absolute max-w-full max-h-full lg:ml-32 top-7`}>
      <div className="z-50 lg:mb-0 font-semibold text-xl text-center content-center">
        {endTime ? "Contest Ended" : now < contestStartTime ? "Contest begins in" : "Contest ends in"}
      </div>
      {endTime ? (
        <div className="text-2xl font-semibold lg:font-bold"> 
          Vote Ended 
        </div>
      ):(
        <div className="grid grid-cols-4 gap-2 lg:gap-4 text-center ">
          <div>
            <div className="text-2xl font-semibold lg:font-bold">{days}</div>
            <div className="text-sm lg:text-base">DAYS</div>
          </div>
          <div>
            <div className="text-2xl font-semibold lg:font-bold">{hours}</div>
            <div className="text-sm lg:text-base">HOURS</div>
          </div>
          <div>
            <div className="text-2xl font-semibold lg:font-bold">{minutes}</div>
            <div className="text-sm lg:text-base">MINS</div>
          </div>
          <div>
            <div className="text-2xl font-semibold lg:font-bold">{seconds}</div>
            <div className="text-sm lg:text-base">SEC</div>
          </div>
        </div>
      )}
    </div>
  );
};