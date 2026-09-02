"use client";

import { useEffect, useState } from "react";

export default function Countdown() {
  const getRemainingSeconds = () => {
    const now = new Date();

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    return Math.max(0, Math.floor((endOfDay.getTime() - now.getTime()) / 1000));
  };
  const [mounted, setMounted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(getRemainingSeconds);

  useEffect(() => {
    setMounted(true);

    const timer = setInterval(() => {
      setSecondsLeft(getRemainingSeconds());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;
  if (!mounted) {
    return null;
  }
  return (
    <div className="flex flex-row my-5">
      <div className="font-medium text-xl min-w-[130]">Kết thúc sau </div>
      <span className="text-xl">
        <span
          style={{ "--value": hours } as React.CSSProperties}
          aria-label={`${hours} hours`}
          className="bg-red-500 text-white px-2 py-1 rounded-sm m-2"
        >
          {hours < 10 ? `0${hours}` : hours}
        </span>
        :
        <span
          style={{ "--value": minutes } as React.CSSProperties}
          aria-label={`${minutes} minutes`}
          className="bg-red-500 text-white px-2 py-1 rounded-sm m-2"
        >
          {minutes < 10 ? `0${minutes}` : minutes}
        </span>
        :
        <span
          style={{ "--value": seconds } as React.CSSProperties}
          aria-label={`${seconds} seconds`}
          className="bg-red-500 text-white px-2 py-1 rounded-sm m-2"
        >
          {seconds < 10 ? `0${seconds}` : seconds}
        </span>
      </span>
    </div>
  );
}
