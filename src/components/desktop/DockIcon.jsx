import React, { useState } from 'react';

const DockIcon = ({ icon, label, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const isImageIcon = typeof icon === 'string';

  return (
    <div className="relative group flex flex-col items-center gap-2">
      <div className={`absolute -top-12 bg-gray-800/80 text-white text-xs px-3 py-1 rounded-lg backdrop-blur-md transition-opacity duration-200 max-sm:hidden ${hovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {label}
      </div>

      <button
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`
          dock-icon
          transition-all duration-300 ease-out
          ${hovered ? 'scale-125 -translate-y-4 mx-2' : 'scale-100 mx-0'}
          h-14 w-14 max-sm:h-12 max-sm:w-12 flex items-center justify-center
          active:scale-110
        `}
      >
        {isImageIcon ? (
          <img src={icon} alt={label} className="w-full h-full object-contain" />
        ) : (
          <icon size={24} className="max-sm:w-5 max-sm:h-5" />
        )}
      </button>

      <div className="w-1 h-1 rounded-full bg-white/50 opacity-0 group-hover:opacity-100 max-sm:hidden" />
    </div>
  );
};

export default DockIcon;

