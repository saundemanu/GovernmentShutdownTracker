'use client'
import React, { useState, useEffect } from 'react';

const calculateCountdown = () => {
  const shutdownDate = new Date(Date.UTC(2023, 9, 1)); // October is month 9 (0-based index)
  const now = new Date();
  const timeDifference = shutdownDate.getTime() - now.getTime();
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
  const [countdown, setCountdown] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(
    null
  );
  useEffect(() => {
    const countdownValue = calculateCountdown();
    setCountdown(countdownValue);

    const interval = setInterval(() => {
      const updatedCountdownValue = calculateCountdown();
      setCountdown(updatedCountdownValue);
    }, 1000);
  
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* ... Existing JSX ... */}
      {countdown !== null && (
        <div className="text-center">
          <h1 className="text-8xl font-bold mb-4">Government Shutdown Countdown</h1>
          <div className="flex gap-5">
  <div>
    <span className="countdown font-mono text-8xl">
      <span style={{"--value": countdown ? countdown.days : 0}}></span>
    </span>
    <span>days</span>
  </div> 
  <div>
    <span className="countdown font-mono text-8xl">
      <span style={{"--value": countdown ? countdown.hours : 0}}></span>
    </span>
    <span>hours</span>
  </div> 
  <div>
    <span className="countdown font-mono text-8xl">
      <span style={{"--value": countdown ? countdown.minutes : 0}}></span>
    </span>
    <span>min</span>
  </div> 
  <div>
    <span className="countdown font-mono text-8xl">
      <span style={{"--value": countdown ? countdown.seconds : 0}}></span>
    </span>
    <span>sec</span>
  </div>
</div>

        </div>
      )}
    </main>
  );
}
