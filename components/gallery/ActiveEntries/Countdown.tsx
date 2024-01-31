"use client";
import React from "react";
import { useEffect, useState } from "react";

export const Countdown = () => {
  const [EndTime, setEndTime] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const target = new Date("06/14/2024 23:59:59");

    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      setDays(d);

      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      setHours(h);

      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      setMinutes(m);

      const s = Math.floor((difference % (1000 * 60)) / 1000);
      setSeconds(s);


      if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
        setEndTime(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="">
      {EndTime ? (
        <>
          <div className="text-2xl font-semibold lg:font-bold"> 
            Vote Ended 
          </div>
        </>
      ):(
        <>
          <div className="text-2xl font-semibold lg:font-bold">
            <div>{days}<span className="mr-6 lg:mr-8"></span>{hours}<span className="mr-6 lg:mr-8"></span>{minutes}<span className="mr-6 lg:mr-8"></span>{seconds}</div>
          </div>
        </>
      )}
    </div>
  );
};