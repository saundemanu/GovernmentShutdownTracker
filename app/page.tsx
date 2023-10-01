'use client'
import React, { useState, useEffect } from 'react';
import GradientBackground from './gradientbackground';
import InteractiveTitle from './interactiveTitle';

const calculateCountdown = () => {
  const shutdownDate = new Date(Date.UTC(2023, 11, 17));
  const now = new Date();
  const timeDifference = shutdownDate.getTime() - now.getTime();

  if (timeDifference > 0) {
    const totalSeconds = Math.floor(timeDifference / 1000) + (3600 * 4);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { days, hours, minutes, seconds };
  }

  return null; 
};

const calculateShutdownDuration = () => {
  const shutdownDate = new Date(Date.UTC(2023, 9, 1));
  const now = new Date();
  const timeDifference = now.getTime() - shutdownDate.getTime();

  if (timeDifference > 0) {
    const totalSeconds = Math.floor(timeDifference / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { days, hours, minutes, seconds };
  }

  return null;
};

export default function Home() {
  const [countdown, setCountdown] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);
  const [shutdownDuration, setShutdownDuration] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    const countdownValue = calculateCountdown();
    setCountdown(countdownValue);

    const interval = setInterval(() => {
      const updatedCountdownValue = calculateCountdown();
      setCountdown(updatedCountdownValue);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const shutdownDurationValue = calculateShutdownDuration();
    setShutdownDuration(shutdownDurationValue);

    const interval = setInterval(() => {
      const updatedShutdownDurationValue = calculateShutdownDuration();
      setShutdownDuration(updatedShutdownDurationValue);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <GradientBackground />
      {countdown !== null && (
        <div className="text-center z-10">
          {/* <h1 className="text-8xl font-bold mb-4">Government Shutdown Countdown</h1> */}
          <InteractiveTitle text="Government Shutdown Countdown"/>
          <div className="flex gap-5 w-full justify-center mt-16">
            <div className="grid grid-cols-4 gap-4 ">
              <div className="flex flex-col items-center bg-neutral p-8 rounded-box text-neutral-content ">
                <span className="countdown font-mono text-8xl">
                  <span style={{ "--value": countdown ? countdown.days : 0 } as React.CSSProperties}></span>
                </span>
                <span className="text-xl mt-2">days</span>
              </div>
              <div className="flex flex-col items-center bg-neutral p-8 rounded-box text-neutral-content ">
                <span className="countdown font-mono text-8xl">
                  <span style={{ "--value": countdown ? countdown.hours : 0 } as React.CSSProperties}></span>
                </span>
                <span className="text-xl mt-2">hours</span>
              </div>
              <div className="flex flex-col items-center bg-neutral p-8 rounded-box text-neutral-content ">
                <span className="countdown font-mono text-8xl">
                  <span style={{ "--value": countdown ? countdown.minutes : 0 } as React.CSSProperties}></span>
                </span>
                <span className="text-xl mt-2">minutes</span>
              </div>
              <div className="flex flex-col items-center bg-neutral p-8 rounded-box text-neutral-content ">
                <span className="countdown font-mono text-8xl">
                  <span style={{ "--value": countdown ? countdown.seconds : 0 } as React.CSSProperties}></span>
                </span>
                <span className="text-xl mt-2">seconds</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {shutdownDuration !== null && (
        <div className="text-center mt-16">
          <h1 className="text-8xl font-bold mb-4">Government Shutdown Duration</h1>
          <div className="flex gap-5 w-full justify-center">
            <div className="grid grid-cols-4 gap-4 ">
              <div className="flex flex-col items-center bg-neutral p-8 rounded-box text-neutral-content ">
                <span className="countdown font-mono text-8xl">
                  <span style={{ "--value": shutdownDuration ? shutdownDuration.days : 0 } as React.CSSProperties}></span>
                </span>
                <span className="text-xl mt-2">days</span>
              </div>
              <div className="flex flex-col items-center bg-neutral p-8 rounded-box text-neutral-content ">
                <span className="countdown font-mono text-8xl">
                  <span style={{ "--value": shutdownDuration ? shutdownDuration.hours : 0 } as React.CSSProperties}></span>
                </span>
                <span className="text-xl mt-2">hours</span>
              </div>
              <div className="flex flex-col items-center bg-neutral p-8 rounded-box text-neutral-content ">
                <span className="countdown font-mono text-8xl">
                  <span style={{ "--value": shutdownDuration ? shutdownDuration.minutes : 0 } as React.CSSProperties}></span>
                </span>
                <span className="text-xl mt-2">minutes</span>
              </div>
              <div className="flex flex-col items-center bg-neutral p-8 rounded-box text-neutral-content ">
                <span className="countdown font-mono text-8xl">
                  <span style={{ "--value": shutdownDuration ? shutdownDuration.seconds : 0 } as React.CSSProperties}></span>
                </span>
                <span className="text-xl mt-2">seconds</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
