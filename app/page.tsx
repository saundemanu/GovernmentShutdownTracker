'use client'
import React, { useState, useEffect } from 'react';
import { setupDatabase, createShutdownTimesTable, insertShutdownTime } from '../lib/db';

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

  useEffect(() => {
    (async () => {
      const db = await setupDatabase();
      await createShutdownTimesTable(db);
      try {
        await insertShutdownTime(db, '2023-10-01', 'Government Funding Expiration');
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

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
      {countdown !== null && (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Government Shutdown Countdown</h1>
          <p className="text-2xl">
            {countdown.days} days, {countdown.hours} hours, {countdown.minutes} minutes, {countdown.seconds} seconds remaining
          </p>
        </div>
      )}
    </main>
  );
}
