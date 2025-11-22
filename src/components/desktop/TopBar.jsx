import React, { useState, useEffect } from 'react';
import { Command, Battery, Wifi, Search } from 'lucide-react';

const TopBar = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative z-50 h-8 bg-white/30 dark:bg-black/40 backdrop-blur-xl flex items-center justify-between px-4 text-sm font-medium text-gray-800 dark:text-white shadow-sm">
      <div className="flex items-center gap-4">
        <Command size={16} />
        <span className="font-bold">Adrian's Portfolio</span>
        <span className="hidden sm:inline hover:bg-white/20 px-2 rounded py-0.5 cursor-pointer">File</span>
        <span className="hidden sm:inline hover:bg-white/20 px-2 rounded py-0.5 cursor-pointer">Edit</span>
        <span className="hidden sm:inline hover:bg-white/20 px-2 rounded py-0.5 cursor-pointer">View</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex gap-2 items-center">
          <Battery size={18} />
          <span className="text-xs">100%</span>
        </div>
        <Wifi size={16} />
        <Search size={16} />
        <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
    </div>
  );
};

export default TopBar;

