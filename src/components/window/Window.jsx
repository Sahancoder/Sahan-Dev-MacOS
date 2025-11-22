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
  const [animationPhase, setAnimationPhase] = useState(0);
  const windowRef = useRef(null);

  // macOS-style pop-up animation on mount
  useEffect(() => {
    // Phase 0: Initial state (small, transparent, slightly down)
    setAnimationPhase(0);
    
    // Phase 1: Pop up with slight overshoot
    const timer1 = setTimeout(() => setAnimationPhase(1), 10);
    
    // Phase 2: Settle back to normal size
    const timer2 = setTimeout(() => setAnimationPhase(2), 250);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
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

  // Animation transforms based on phase
  const getAnimationStyle = () => {
    switch(animationPhase) {
      case 0: // Initial: small, transparent, down
        return {
          transform: `translate(${windowData.position.x}px, ${windowData.position.y + 20}px) scale(0.92)`,
          opacity: 0,
          filter: 'blur(2px)'
        };
      case 1: // Pop: slight overshoot
        return {
          transform: `translate(${windowData.position.x}px, ${windowData.position.y - 5}px) scale(1.02)`,
          opacity: 1,
          filter: 'blur(0px)'
        };
      case 2: // Settle: normal
        return {
          transform: `translate(${windowData.position.x}px, ${windowData.position.y}px) scale(1)`,
          opacity: 1,
          filter: 'blur(0px)'
        };
      default:
        return {
          transform: `translate(${windowData.position.x}px, ${windowData.position.y}px) scale(1)`,
          opacity: 1,
          filter: 'blur(0px)'
        };
    }
  };

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
        ...getAnimationStyle(),
        width: `${windowData.size.width}px`,
        height: `${windowData.size.height}px`,
        zIndex: windowData.zIndex,
        transition: animationPhase === 0 ? 'none' : animationPhase === 1 ? 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'all 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        boxShadow: animationPhase === 2 ? '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)' : '0 10px 25px -5px rgba(0, 0, 0, 0.2)',
      }}
      className="fixed rounded-xl overflow-hidden border border-white/20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl flex flex-col max-sm:!w-[calc(100vw-16px)] max-sm:!h-[calc(100vh-80px)] max-sm:!translate-x-2 max-sm:!translate-y-2 max-sm:left-0 max-sm:top-0"
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

