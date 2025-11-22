import React from 'react';
import { Sun, Moon, Wifi } from 'lucide-react';
import { useStore } from '../../store/useStore';

const Settings = () => {
  const { theme, toggleTheme } = useStore();

  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-900 h-full">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">System Preferences</h2>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg text-blue-600 dark:text-blue-300">
              {theme === 'light' ? <Sun size={20} /> : <Moon size={20} />}
            </div>
            <div>
              <p className="font-medium text-gray-800 dark:text-white">Appearance</p>
              <p className="text-sm text-gray-500">{theme === 'light' ? 'Light Mode' : 'Dark Mode'}</p>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-gray-800 dark:text-white"
          >
            Toggle
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-4">
           <Wifi className="text-blue-500" />
           <span className="font-medium text-gray-800 dark:text-white">Network</span>
        </div>
        <div className="text-sm text-green-500">Connected to Wi-Fi</div>
      </div>
    </div>
  );
};

export default Settings;

