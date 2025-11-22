import React, { useState } from 'react';
import { Apple, HardDrive, Folder, Image, Wallpaper } from 'lucide-react';
import { useStore } from '../store/useStore';

const MenuBar = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const { openWindow } = useStore();

  const handleMenuClick = (menuName) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  const handleFileClick = () => {
    // Open "This PC" window showing partitions
    openWindow({
      id: 'this-pc',
      title: 'This PC',
      component: 'ThisPC',
      position: { x: 100, y: 100 },
      size: { width: 800, height: 600 }
    });
    setActiveMenu(null);
  };

  const menus = {
    file: {
      label: 'File',
      items: [
        { label: 'This PC', action: handleFileClick, icon: <HardDrive size={14} /> },
        { label: 'New Folder', action: () => console.log('New Folder') },
        { label: 'New File', action: () => console.log('New File') },
        { divider: true },
        { label: 'Close Window', action: () => console.log('Close') }
      ]
    },
    edit: {
      label: 'Edit',
      items: [
        { label: 'Undo', shortcut: '⌘Z' },
        { label: 'Redo', shortcut: '⌘⇧Z' },
        { divider: true },
        { label: 'Cut', shortcut: '⌘X' },
        { label: 'Copy', shortcut: '⌘C' },
        { label: 'Paste', shortcut: '⌘V' }
      ]
    },
    view: {
      label: 'View',
      items: [
        { label: 'as Icons', action: () => console.log('Icons view') },
        { label: 'as List', action: () => console.log('List view') },
        { label: 'as Columns', action: () => console.log('Columns view') },
        { divider: true },
        { label: 'Show Preview', action: () => console.log('Preview') }
      ]
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-6 md:h-6 max-md:h-11 bg-white/80 backdrop-blur-xl border-b border-gray-200 flex items-center px-4 z-50 max-md:px-4 max-md:justify-center">
      {/* Desktop Menu Bar */}
      <div className="hidden md:flex items-center w-full">
        {/* Apple Menu */}
        <button
          onClick={() => handleMenuClick('apple')}
          className="mr-4 hover:bg-gray-200/50 p-1 rounded"
        >
          <Apple size={16} fill="currentColor" />
        </button>

        {/* App Title */}
        <span className="font-semibold text-sm mr-6">Sahan Dev</span>

        {/* Menu Items */}
        {Object.entries(menus).map(([key, menu]) => (
          <div key={key} className="relative">
            <button
              onClick={() => handleMenuClick(key)}
              className={`px-2 py-1 text-sm hover:bg-gray-200/50 rounded ${
                activeMenu === key ? 'bg-gray-200/50' : ''
              }`}
            >
              {menu.label}
            </button>

            {activeMenu === key && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setActiveMenu(null)}
                />
                <div className="absolute top-full left-0 mt-1 w-56 bg-white/95 backdrop-blur-xl rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  {menu.items.map((item, idx) => (
                    item.divider ? (
                      <div key={idx} className="h-px bg-gray-200 my-1" />
                    ) : (
                      <button
                        key={idx}
                        onClick={() => {
                          item.action?.();
                          setActiveMenu(null);
                        }}
                        className="w-full px-3 py-1.5 text-left text-sm hover:bg-blue-500 hover:text-white flex items-center justify-between"
                      >
                        <span className="flex items-center gap-2">
                          {item.icon}
                          {item.label}
                        </span>
                        {item.shortcut && (
                          <span className="text-xs opacity-60">{item.shortcut}</span>
                        )}
                      </button>
                    )
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Mobile Status Bar */}
      <div className="md:hidden flex items-center justify-center w-full">
        <span className="text-sm font-semibold">Sahan Dev</span>
      </div>
    </div>
  );
};

export default MenuBar;

