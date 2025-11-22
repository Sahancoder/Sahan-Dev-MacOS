import React, { useState, useEffect } from 'react';
import { MdArrowBack, MdHome, MdApps } from 'react-icons/md';
import { PROJECTS, PROFILE } from '../../data/projects';
import { useStore } from '../../store/useStore';

// Play macOS click sound
const playClickSound = () => {
  const audio = new Audio('/assests/sounds/mac-click.wav');
  audio.volume = 0.3;
  audio.play().catch(() => {});
};

const MobileAppIcon = ({ icon, label, onClick }) => {
  return (
    <button
      onClick={() => { playClickSound(); onClick(); }}
      className="flex flex-col items-center gap-2 active:scale-95 transition-transform"
    >
      <div className="w-16 h-16 flex items-center justify-center">
        <img src={icon} alt={label} className="w-16 h-16 object-contain drop-shadow-lg" />
      </div>
      <span className="text-white text-xs font-medium text-center drop-shadow-lg max-w-[72px] truncate">
        {label}
      </span>
    </button>
  );
};

const MobileProjectIcon = ({ project, onClick }) => (
  <button
    onClick={() => { playClickSound(); onClick(); }}
    className="flex flex-col items-center gap-2 active:scale-95 transition-transform"
  >
    <div className="w-16 h-16 flex items-center justify-center">
      <img src="/assests/icons/Folder.png" alt={project.title} className="w-16 h-16 object-contain drop-shadow-lg" />
    </div>
    <span className="text-gray-900 dark:text-white text-xs font-medium text-center drop-shadow-lg max-w-[72px] line-clamp-2 leading-tight">
      {project.title}
    </span>
  </button>
);

const MobileHome = () => {
  const [activeView, setActiveView] = useState('home'); // home, finder, project
  const [selectedProject, setSelectedProject] = useState(null);
  const { theme, openWindow } = useStore();

  const handleProjectClick = (project) => {
    playClickSound();
    setSelectedProject(project);
    setActiveView('project');
  };

  const goToHome = () => {
    playClickSound();
    setActiveView('home');
    setSelectedProject(null);
  };

  const goToFinder = () => {
    playClickSound();
    setActiveView('finder');
  };

  // Home Screen with App Icons
  if (activeView === 'home') {
    const mainApps = [
      { icon: "/assests/icons/Finder.png", label: "Projects", action: () => { playClickSound(); setActiveView('finder'); } },
      { icon: "/assests/icons/Home.png", label: "Portfolio", action: () => { playClickSound(); window.open(PROFILE.portfolio, '_blank'); } },
      { icon: "/assests/icons/Photos.png", label: "About", action: () => { playClickSound(); setSelectedProject({ title: 'About Me', description: PROFILE.bio, isAbout: true }); setActiveView('project'); } },
      { icon: "/assests/icons/Document.png", label: "Resume", action: () => { playClickSound(); window.open('/assests/cv/Sahan_Intern SE.pdf', '_blank'); } },
      { icon: "/assests/icons/github.png", label: "GitHub", action: () => { playClickSound(); window.open(PROFILE.github, '_blank'); } },
      { icon: "/assests/icons/LinkedIn_icon.png", label: "LinkedIn", action: () => { playClickSound(); window.open(PROFILE.linkedin, '_blank'); } },
      { icon: "/assests/icons/Mail.png", label: "Email", action: () => { playClickSound(); window.location.href = `mailto:${PROFILE.email}`; } },
      { icon: "/assests/icons/whatsapp.png", label: "WhatsApp", action: () => { playClickSound(); window.open(`https://wa.me/${PROFILE.whatsapp.replace(/\D/g, '')}`, '_blank'); } },
      { icon: "/assests/icons/Terminal.png", label: "Terminal", action: () => { playClickSound(); } },
      { icon: "/assests/icons/Calculator.png", label: "Calculator", action: () => { playClickSound(); } },
      { icon: "/assests/icons/Calendar.png", label: "Calendar", action: () => { playClickSound(); } },
      { icon: "/assests/icons/Clock.png", label: "Clock", action: () => { playClickSound(); } },
      { icon: "/assests/icons/Music.png", label: "Music", action: () => { playClickSound(); } },
      { icon: "/assests/icons/Books.png", label: "Books", action: () => { playClickSound(); } },
      { icon: "/assests/icons/Notes.png", label: "Notes", action: () => { playClickSound(); } },
      { icon: "/assests/icons/Numbers.png", label: "Numbers", action: () => { playClickSound(); } },
      { icon: "/assests/icons/Weather.png", label: "Weather", action: () => { playClickSound(); } },
      { icon: "/assests/icons/Settings.png", label: "Settings", action: () => { playClickSound(); } },
      { icon: "/assests/icons/App Store.png", label: "App Store", action: () => { playClickSound(); } },
      { icon: "/assests/icons/Bluetooth File Exchange.png", label: "Bluetooth", action: () => { playClickSound(); } },
    ];

    return (
      <div className="h-full w-full flex flex-col overflow-hidden">
        {/* Main Apps Grid */}
        <div className="flex-1 overflow-y-auto pt-12 pb-24 px-6 py-4">
          <div className="grid grid-cols-4 gap-6 auto-rows-max">
            {mainApps.map((app, i) => (
              <MobileAppIcon key={i} icon={app.icon} label={app.label} gradient={app.gradient} onClick={app.action} />
            ))}
          </div>
        </div>

        {/* iOS-style Navigation Bar - Fixed 3 buttons */}
        <div className="fixed bottom-0 left-0 right-0 h-20 flex items-center justify-around px-8 bg-gray-900/90 backdrop-blur-2xl border-t border-white/20">
          <button
            onClick={() => { playClickSound(); goToHome(); }}
            className="flex flex-col items-center gap-1 text-white active:scale-95 transition-all"
            aria-label="Back"
          >
            <MdArrowBack size={24} />
            <span className="text-xs font-medium drop-shadow-lg">Back</span>
          </button>
          
          <button
            onClick={() => { playClickSound(); goToHome(); }}
            className="flex flex-col items-center gap-1 text-white active:scale-95 transition-all"
            aria-label="Home"
          >
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center shadow-lg">
              <MdHome size={26} />
            </div>
            <span className="text-xs font-semibold drop-shadow-lg">Home</span>
          </button>
          
          <button
            onClick={() => { playClickSound(); setActiveView('finder'); }}
            className="flex flex-col items-center gap-1 text-white active:scale-95 transition-all"
            aria-label="Projects"
          >
            <MdApps size={24} />
            <span className="text-xs font-medium drop-shadow-lg">Apps</span>
          </button>
        </div>
      </div>
    );
  }

  // Finder View (All Projects)
  if (activeView === 'finder') {
    return (
      <div className="h-full w-full flex flex-col bg-gray-100 dark:bg-gray-900">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
          <button
            onClick={() => { playClickSound(); goToHome(); }}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg active:scale-95 transition-all text-gray-800 dark:text-white"
          >
            <MdArrowBack size={20} />
          </button>
          <h2 className="text-lg font-semibold flex-1 text-gray-900 dark:text-white drop-shadow-lg">All Projects</h2>
        </div>

        {/* Projects List */}
        <div className="flex-1 overflow-y-auto px-4 py-4 pb-24">
          <div className="grid grid-cols-3 gap-4">
            {PROJECTS.map((project) => (
              <MobileProjectIcon
                key={project.id}
                project={project}
                onClick={() => handleProjectClick(project)}
              />
            ))}
          </div>
        </div>

        {/* iOS Navigation Bar - Consistent across all views */}
        <div className="fixed bottom-0 left-0 right-0 h-20 flex items-center justify-around px-8 bg-gray-900/90 backdrop-blur-2xl border-t border-white/20">
          <button
            onClick={() => { playClickSound(); goToHome(); }}
            className="flex flex-col items-center gap-1 text-white active:scale-95 transition-all"
            aria-label="Back"
          >
            <MdArrowBack size={24} />
            <span className="text-xs font-medium drop-shadow-lg">Back</span>
          </button>
          
          <button
            onClick={() => { playClickSound(); goToHome(); }}
            className="flex flex-col items-center gap-1 text-white active:scale-95 transition-all"
            aria-label="Home"
          >
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center shadow-lg">
              <MdHome size={26} />
            </div>
            <span className="text-xs font-semibold drop-shadow-lg">Home</span>
          </button>
          
          <button
            onClick={() => { playClickSound(); setActiveView('finder'); }}
            className="flex flex-col items-center gap-1 text-white active:scale-95 transition-all"
            aria-label="Projects"
          >
            <MdApps size={24} />
            <span className="text-xs font-medium drop-shadow-lg">Apps</span>
          </button>
        </div>
      </div>
    );
  }

  // Project Detail View
  if (activeView === 'project' && selectedProject) {
    return (
      <div className="h-full w-full flex flex-col bg-white dark:bg-gray-900">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <button
            onClick={() => { playClickSound(); goToHome(); }}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg active:scale-95 transition-all text-gray-800 dark:text-white"
          >
            <MdArrowBack size={20} />
          </button>
          <h2 className="text-lg font-semibold flex-1 truncate text-gray-900 dark:text-white">{selectedProject.title}</h2>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 pb-24">
          {selectedProject.isAbout ? (
            // About Me View
            <div className="space-y-6">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto shadow-xl ring-4 ring-white dark:ring-gray-700">
                <img 
                  src="/assests/profile_photo/pic.png" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">{PROFILE.shortName}</h3>
                <p className="text-blue-600 dark:text-blue-400 font-semibold">{PROFILE.title}</p>
              </div>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {selectedProject.description}
              </p>

              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <p><strong>Education:</strong> {PROFILE.degree}</p>
                <p>{PROFILE.university}</p>
                <p><strong>Location:</strong> {PROFILE.location}</p>
              </div>

              {/* Contact Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-4">
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 text-white rounded-xl font-medium active:scale-95 transition-all"
                >
                  <img src="/assests/icons/Contacts.png" alt="GitHub" className="w-5 h-5" />
                  GitHub
                </a>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl font-medium active:scale-95 transition-all"
                >
                  <img src="/assests/icons/Contacts.png" alt="LinkedIn" className="w-5 h-5" />
                  LinkedIn
                </a>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-red-500 text-white rounded-xl font-medium active:scale-95 transition-all"
                >
                  <img src="/assests/icons/Messages.png" alt="Email" className="w-5 h-5" />
                  Email
                </a>
                <a
                  href={`https://wa.me/${PROFILE.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-xl font-medium active:scale-95 transition-all"
                >
                  <img src="/assests/icons/Messages.png" alt="WhatsApp" className="w-5 h-5" />
                  WhatsApp
                </a>
              </div>
            </div>
          ) : (
            // Project Detail View
            <div className="space-y-6">
              <div className="w-24 h-24 mx-auto flex items-center justify-center">
                <img src="/assests/icons/Folder.png" alt="Project" className="w-full h-full object-contain drop-shadow-xl" />
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">{selectedProject.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {selectedProject.category}
                </p>
              </div>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {selectedProject.description}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                {selectedProject.link && (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium text-center active:scale-95 transition-all"
                  >
                    View Project
                  </a>
                )}
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-xl font-medium flex items-center gap-2 active:scale-95 transition-all"
                  >
                    <img src="/assests/icons/Contacts.png" alt="GitHub" className="w-5 h-5" />
                    Code
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* iOS Navigation Bar - Consistent across all views */}
        <div className="fixed bottom-0 left-0 right-0 h-20 flex items-center justify-around px-8 bg-gray-900/90 backdrop-blur-2xl border-t border-white/20">
          <button
            onClick={() => { playClickSound(); setActiveView('finder'); }}
            className="flex flex-col items-center gap-1 text-white active:scale-95 transition-all"
            aria-label="Back"
          >
            <MdArrowBack size={24} />
            <span className="text-xs font-medium drop-shadow-lg">Back</span>
          </button>
          
          <button
            onClick={() => { playClickSound(); goToHome(); }}
            className="flex flex-col items-center gap-1 text-white active:scale-95 transition-all"
            aria-label="Home"
          >
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center shadow-lg">
              <MdHome size={26} />
            </div>
            <span className="text-xs font-semibold drop-shadow-lg">Home</span>
          </button>
          
          <button
            onClick={() => { playClickSound(); setActiveView('finder'); }}
            className="flex flex-col items-center gap-1 text-white active:scale-95 transition-all"
            aria-label="Projects"
          >
            <MdApps size={24} />
            <span className="text-xs font-medium drop-shadow-lg">Apps</span>
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default MobileHome;
