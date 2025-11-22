import React from 'react';
import { useStore } from '../../store/useStore';
import DockIcon from './DockIcon';

const Dock = () => {
  const { openWindow } = useStore();

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 max-sm:bottom-2 max-sm:scale-90">
      <div className="bg-white/20 dark:bg-black/30 backdrop-blur-2xl border border-white/20 dark:border-white/10 px-4 py-3 rounded-2xl flex items-end gap-3 shadow-2xl transition-all duration-300 hover:px-6 max-sm:px-3 max-sm:py-2 max-sm:gap-2">
        {/* Finder - Always first on macOS */}
        <DockIcon icon="/assests/icons/Finder.png" label="Finder" onClick={() => openWindow({ id: 'finder', title: 'Finder', component: 'Finder' })} />
        
        {/* App icons */}
        <DockIcon icon="/assests/icons/Contacts.png" label="Safari" onClick={() => openWindow({ id: 'safari', title: 'Safari', component: 'Safari' })} />
        <DockIcon icon="/assests/icons/Terminal.png" label="Terminal" onClick={() => openWindow({ id: 'terminal', title: 'Terminal', component: 'Terminal' })} />
        <DockIcon icon="/assests/icons/Messages.png" label="Gemini AI" onClick={() => openWindow({ id: 'gemini', title: 'Gemini Assistant', component: 'GeminiChat' })} />
        <DockIcon icon="/assests/icons/Photos.png" label="About Me" onClick={() => openWindow({ id: 'welcome', title: 'Welcome', component: 'Welcome' })} />
        <DockIcon icon="/assests/icons/Settings.png" label="Settings" onClick={() => openWindow({ id: 'settings', title: 'System Preferences', component: 'Settings' })} />
        
        {/* Divider before Trash */}
        <div className="w-[1px] h-10 bg-white/30 mx-1 max-sm:h-8" />
        
        {/* Trash - Always last on macOS */}
        <DockIcon icon="/assests/icons/Trash Empty.png" label="Trash" onClick={() => console.log('Trash clicked')} />
      </div>
    </div>
  );
};

export default Dock;

