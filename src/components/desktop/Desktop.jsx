import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { WALLPAPERS, WALLPAPER_INTERVAL } from '../../data/wallpapers';
import MenuBar from '../MenuBar';
import Dock from './Dock';
import Window from '../window/Window';
import MobileHome from './MobileHome';

const Desktop = () => {
  const { windows, openWindow, theme } = useStore();
  const [currentWallpaperIndex, setCurrentWallpaperIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [icons, setIcons] = useState([
    { id: 'projects', label: 'Projects', icon: '/assests/icons/Folder.png', x: window.innerWidth - 120, y: 80, action: () => openWindow({ id: 'finder', title: 'My Projects', component: 'Finder' }) },
    { id: 'resume', label: 'Resume', icon: '/assests/icons/Document.png', x: window.innerWidth - 120, y: 180, action: () => window.open('/assests/cv/Sahan_Intern SE.pdf', '_blank') }
  ]);
  const [dragging, setDragging] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Detect mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Drag handlers
  const handleMouseDown = (e, iconId) => {
    const icon = icons.find(i => i.id === iconId);
    setDragging(iconId);
    setDragOffset({
      x: e.clientX - icon.x,
      y: e.clientY - icon.y
    });
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      setIcons(prev => prev.map(icon => 
        icon.id === dragging 
          ? { ...icon, x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y }
          : icon
      ));
    }
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragging, dragOffset]);

  // Wallpaper slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWallpaperIndex((prev) => (prev + 1) % WALLPAPERS.length);
    }, WALLPAPER_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const currentWallpaper = WALLPAPERS[currentWallpaperIndex];

  return (
    <div className={`h-screen w-screen overflow-hidden relative selection:bg-blue-500/30 ${theme}`}>
      {/* Wallpaper with smooth transition */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center transform scale-105 transition-opacity duration-1000"
        style={{
          backgroundImage: `url(${currentWallpaper})`,
          opacity: 1
        }}
      />

      <div className="absolute inset-0 bg-black/0 dark:bg-black/20 pointer-events-none transition-colors duration-500" />

      <MenuBar />

      {/* Mobile View - iOS Style */}
      {isMobile ? (
        <div className="relative z-10 w-full h-full">
          <MobileHome />
        </div>
      ) : (
        /* Desktop View - macOS Style */
        <div className="relative z-10 w-full h-full pt-6">
          {/* Desktop Icons - Draggable */}
          {icons.map(icon => (
            <div
              key={icon.id}
              className="group flex flex-col items-center gap-1 cursor-move w-20 absolute z-0"
              style={{ left: `${icon.x}px`, top: `${icon.y}px` }}
              onMouseDown={(e) => handleMouseDown(e, icon.id)}
              onClick={(e) => {
                if (!dragging) {
                  icon.action();
                }
              }}
            >
              <div className="w-16 h-16 flex items-center justify-center transition-all group-hover:scale-110">
                <img src={icon.icon} alt={icon.label} className="w-full h-full object-contain drop-shadow-lg" />
              </div>
              <span className="text-white text-xs font-medium bg-black/20 px-2 py-0.5 rounded-md backdrop-blur-md select-none">
                {icon.label}
              </span>
            </div>
          ))}

          {/* Windows with animation */}
          {windows.map(win => (
            <Window key={win.id} windowData={win} />
          ))}
        </div>
      )}

      {/* Dock - Desktop only */}
      {!isMobile && <Dock />}

      {/* Wallpaper indicator dots */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-40 max-md:bottom-2">
        {WALLPAPERS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentWallpaperIndex(i)}
            className={`w-2 h-2 rounded-full transition-all max-md:w-1.5 max-md:h-1.5 ${
              i === currentWallpaperIndex 
                ? 'bg-white w-6 max-md:w-4' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Switch to wallpaper ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Desktop;

