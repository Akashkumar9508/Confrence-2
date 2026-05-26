import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CountdownTimer({ targetDate = "2026-12-12T09:00:00" }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isCompleted, setIsCompleted] = useState(false);

  function calculateTimeLeft() {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);
      
      const totalSecs = Object.values(remaining).reduce((a, b) => a + b, 0);
      if (totalSecs === 0) {
        setIsCompleted(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeBlocks = [
    { label: 'DAYS', value: timeLeft.days || 0, color: 'from-brand-500 to-brand-600' },
    { label: 'HOURS', value: timeLeft.hours || 0, color: 'from-brand-600 to-brand-700' },
    { label: 'MINUTES', value: timeLeft.minutes || 0, color: 'from-brand-700 to-accent-600' },
    { label: 'SECONDS', value: timeLeft.seconds || 0, color: 'from-accent-600 to-accent-500' }
  ];

  if (isCompleted) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-brand-950/20 rounded-2xl border border-brand-500/30 text-center backdrop-blur-md">
        <h4 className="text-xl font-display font-bold text-brand-400 dark:text-brand-300">The Conference Has Commenced!</h4>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">Join the scientific deliberations and panel discussions live at Hotel Ramada, Jamshedpur.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {timeBlocks.map((block, idx) => (
          <motion.div
            key={block.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="relative overflow-hidden glass-card p-6 flex flex-col items-center justify-center text-center group border border-slate-200/50 dark:border-darkbg-border bg-white/70 dark:bg-[#160c2d]/70 backdrop-blur-md"
          >
            {/* Hover decorative border glowing line */}
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-brand-500 via-accent-400 to-brand-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            
            <span className="font-display font-extrabold text-4xl md:text-5xl bg-gradient-to-br from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent tracking-tight">
              {String(block.value).padStart(2, '0')}
            </span>
            
            <span className="text-[10px] md:text-xs font-semibold text-brand-600 dark:text-accent-400 mt-2 tracking-widest">
              {block.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
