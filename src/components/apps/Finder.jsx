import React, { useState } from 'react';
import { Folder, Globe, Github, ExternalLink } from 'lucide-react';
import { PROJECTS, MINI_PROJECTS } from '../../data/projects';

const Finder = () => {
  const [view, setView] = useState('projects');

  return (
    <div className="flex h-full">
      <div className="w-48 bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-md border-r border-gray-200/50 dark:border-gray-700/50 p-4 flex flex-col gap-6">
        <div>
          <p className="text-xs font-bold text-gray-400 mb-2 px-2">Portfolio</p>
          <ul className="space-y-1">
            <li
              onClick={() => setView('projects')}
              className={`flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-200/50 dark:hover:bg-white/10 cursor-pointer text-sm ${view === 'projects' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-200'}`}
            >
              <Folder size={14} className="text-blue-500" /> Featured Projects
            </li>
            <li
              onClick={() => setView('mini')}
              className={`flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-200/50 dark:hover:bg-white/10 cursor-pointer text-sm ${view === 'mini' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-200'}`}
            >
              <Folder size={14} className="text-purple-500" /> More Projects
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold text-gray-400 mb-2 px-2">Quick Links</p>
          <ul className="space-y-1">
            <li className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-200/50 dark:hover:bg-white/10 cursor-pointer text-sm text-gray-700 dark:text-gray-200">
              <a href="https://github.com/Sahancoder" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 w-full">
                <Github size={14} className="text-gray-500" /> GitHub
              </a>
            </li>
            <li className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-200/50 dark:hover:bg-white/10 cursor-pointer text-sm text-gray-700 dark:text-gray-200">
              <a href="https://sahan-hettiarachchidev.vercel.app/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 w-full">
                <Globe size={14} className="text-gray-500" /> Portfolio Site
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex-1 bg-white dark:bg-gray-900 p-6 overflow-y-auto">
        {view === 'projects' && (
          <>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Featured Projects</h2>
            <div className="grid grid-cols-2 gap-4">
              {PROJECTS.map(proj => (
                <div
                  key={proj.id}
                  className="group p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-400 transition-all cursor-pointer"
                  onClick={() => window.open(proj.link, '_blank')}
                >
                  <div className={`w-12 h-12 ${proj.color} rounded-lg mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`} />
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-1">{proj.title}</h3>
                  <p className="text-xs text-blue-500 mb-2">{proj.category}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">{proj.description}</p>
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    <Github size={12} /> View on GitHub
                  </a>
                </div>
              ))}
            </div>
          </>
        )}

        {view === 'mini' && (
          <>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">More Projects</h2>
            <div className="grid grid-cols-3 gap-3">
              {MINI_PROJECTS.map((proj, i) => (
                <a
                  key={i}
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-400 transition-all cursor-pointer flex flex-col items-center text-center"
                >
                  <Folder className="text-blue-500 mb-2" size={32} />
                  <h3 className="font-medium text-sm text-gray-800 dark:text-white">{proj.name}</h3>
                  <ExternalLink size={12} className="text-gray-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
            <div className="mt-6 text-center">
              <a
                href="https://github.com/Sahancoder?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-all"
              >
                <Github size={16} />
                View All Repositories on GitHub
                <ExternalLink size={14} />
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Finder;

