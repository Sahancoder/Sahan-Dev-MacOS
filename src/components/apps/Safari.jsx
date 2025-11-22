import React from 'react';
import { Globe, Minus, Maximize2, Github, ExternalLink } from 'lucide-react';
import { PROFILE } from '../../data/projects';

const Safari = () => {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      <div className="h-12 bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 flex items-center px-4 gap-4">
        <div className="flex gap-2 text-gray-500">
          <div className="hover:text-gray-800 dark:hover:text-white"><Minus size={16} /></div>
          <div className="hover:text-gray-800 dark:hover:text-white"><Maximize2 size={14} /></div>
        </div>
        <div className="flex-1 bg-white dark:bg-gray-700 rounded-md px-3 py-1 text-sm text-center text-gray-500 dark:text-gray-300 shadow-sm flex items-center justify-center gap-2">
          <Globe size={12} />
          {PROFILE.portfolio}
        </div>
        <div className="w-10" />
      </div>
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-center p-10">
        <div>
          <Github size={64} className="mx-auto mb-4 text-gray-800 dark:text-white" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Visit My Portfolio & GitHub
          </h2>
          <p className="text-gray-500 mb-6">
            Check out my live portfolio and all open source projects
          </p>
          <div className="flex gap-3 justify-center">
            <a
              href={PROFILE.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium inline-flex items-center gap-2 transition-all"
            >
              Live Portfolio
              <ExternalLink size={16} />
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-900 dark:bg-white dark:text-gray-900 text-white px-6 py-2 rounded-lg font-medium inline-flex items-center gap-2 transition-all"
            >
              <Github size={16} />
              GitHub Profile
            </a>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Connect with me:</p>
            <div className="flex gap-4 justify-center text-sm">
              <a href={`mailto:${PROFILE.email}`} className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
                {PROFILE.email}
              </a>
              <span className="text-gray-400">|</span>
              <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Safari;

