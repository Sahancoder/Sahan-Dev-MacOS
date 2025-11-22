import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../../store/useStore';
import Finder from '../apps/Finder';
import Terminal from '../apps/Terminal';
import Safari from '../apps/Safari';
import Welcome from '../apps/Welcome';
import Settings from '../apps/Settings';
import GeminiChat from '../apps/GeminiChat';
import ThisPC from '../windows/ThisPC';
import WindowControls from './WindowControls';

const Window = ({ windowData }) => {
  const { closeWindow, minimizeWindow, focusWindow, updateWindowPos } = useStore();
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(true);
  const windowRef = useRef(null);

  // Pop-up animation on mount
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timer);
  }, [windowData.id]);

  const handleMouseDown = (e) => {
    if (e.target.closest('.window-content')) return;
    setIsDragging(true);
    focusWindow(windowData.id);
    const rect = windowRef.current.getBoundingClientRect();
    setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      updateWindowPos(windowData.id, { x: newX, y: newY });
    };

    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, windowData.id, updateWindowPos]);

  if (!windowData.isOpen || windowData.isMin) return null;

  // Component mapping
  const renderComponent = () => {
    const componentMap = {
      'Finder': <Finder />,
      'Terminal': <Terminal />,
      'Safari': <Safari />,
      'Welcome': <Welcome />,
      'Settings': <Settings />,
      'GeminiChat': <GeminiChat />,
      'ThisPC': <ThisPC />
    };
    return componentMap[windowData.component] || <div>Component not found</div>;
  };

  return (
    <div
      ref={windowRef}
      style={{
        transform: `translate(${windowData.position.x}px, ${windowData.position.y}px) ${isAnimating ? 'scale(0.8)' : 'scale(1)'}`,
        width: `${windowData.size.width}px`,
        height: `${windowData.size.height}px`,
        zIndex: windowData.zIndex,
        opacity: isAnimating ? 0 : 1,
      }}
      className="fixed rounded-xl overflow-hidden shadow-2xl border border-white/20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl flex flex-col transition-all duration-300 ease-out max-sm:!w-[calc(100vw-16px)] max-sm:!h-[calc(100vh-80px)] max-sm:!translate-x-2 max-sm:!translate-y-2 max-sm:left-0 max-sm:top-0"
      onMouseDown={() => focusWindow(windowData.id)}
    >
      <div
        className="h-10 bg-gradient-to-b from-white/50 to-white/30 dark:from-gray-800/50 dark:to-gray-800/30 border-b border-white/10 flex items-center px-4 justify-between cursor-default select-none"
        onMouseDown={handleMouseDown}
      >
        <WindowControls
          onClose={() => closeWindow(windowData.id)}
          onMinimize={() => minimizeWindow(windowData.id)}
        />
        <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
          {windowData.title}
        </span>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-hidden window-content relative">
        {renderComponent()}
      </div>
    </div>
  );
};

export default Window;

