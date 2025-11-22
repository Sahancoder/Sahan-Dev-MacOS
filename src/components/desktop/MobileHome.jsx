import React, { useState, useEffect } from 'react';
import { MdArrowBack, MdHome } from 'react-icons/md';
import { PROJECTS, PROFILE } from '../../data/projects';
import { useStore } from '../../store/useStore';

const MobileAppIcon = ({ icon, label, gradient, onClick }) => {
  const isImageIcon = typeof icon === 'string';
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 active:scale-95 transition-transform"
    >
      <div className={`w-16 h-16 rounded-2xl ${gradient || ''} shadow-lg flex items-center justify-center ${isImageIcon ? 'p-2' : 'border border-white/20'}`}>
        {isImageIcon ? (
          <img src={icon} alt={label} className="w-full h-full object-contain" />
        ) : (
          <icon className="text-white" size={28} />
        )}
      </div>
      <span className="text-white text-xs font-medium text-center drop-shadow-lg max-w-[72px] truncate">
        {label}
      </span>
    </button>
  );
};

const MobileProjectIcon = ({ project, onClick }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center gap-2 active:scale-95 transition-transform"
  >
    <div className="w-16 h-16 flex items-center justify-center">
      <img src="/assests/icons/Folder.png" alt={project.title} className="w-full h-full object-contain drop-shadow-lg" />
    </div>
    <span className="text-white text-xs font-medium text-center drop-shadow-lg max-w-[72px] line-clamp-2 leading-tight">
      {project.title}
    </span>
  </button>
);

const MobileHome = () => {
  const [activeView, setActiveView] = useState('home'); // home, finder, project
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const { theme } = useStore();

  const totalPages = 2; // Number of home screen pages

  // Swipe handlers
  const handleTouchStart = (e) => {
    if (activeView !== 'home') return;
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (activeView !== 'home') return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (activeView !== 'home') return;
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    }
    if (isRightSwipe && currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setActiveView('project');
  };

  const goToHome = () => {
    setActiveView('home');
    setSelectedProject(null);
  };

  // Home Screen with App Icons
  if (activeView === 'home') {
    const appsPage1 = [
      { icon: "/assests/icons/Finder.png", label: "Projects", action: () => setActiveView('finder') },
      { icon: "/assests/icons/Home.png", label: "Portfolio", action: () => window.open(PROFILE.portfolio, '_blank') },
      { icon: "/assests/icons/Photos.png", label: "About", action: () => { setSelectedProject({ title: 'About Me', description: PROFILE.bio, isAbout: true }); setActiveView('project'); } },
      { icon: "/assests/icons/Document.png", label: "Resume", action: () => window.open('/assests/cv/Sahan_Intern SE.pdf', '_blank') },
      { icon: "/assests/icons/Contacts.png", label: "GitHub", action: () => window.open(PROFILE.github, '_blank') },
      { icon: "/assests/icons/Contacts.png", label: "LinkedIn", action: () => window.open(PROFILE.linkedin, '_blank') },
      { icon: "/assests/icons/Messages.png", label: "Email", action: () => window.location.href = `mailto:${PROFILE.email}` },
      { icon: "/assests/icons/Messages.png", label: "WhatsApp", action: () => window.open(`https://wa.me/${PROFILE.whatsapp.replace(/\D/g, '')}`, '_blank') },
    ];

    const projectsPage1 = PROJECTS.slice(0, 8);
    const projectsPage2 = PROJECTS.slice(8, 16);

    return (
      <div 
        className="h-full w-full flex flex-col overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Swipeable pages container */}
        <div 
          className="flex-1 overflow-hidden pt-12 pb-24"
          style={{
            transform: `translateX(-${currentPage * 100}%)`,
            transition: 'transform 0.3s ease-out',
            width: `${totalPages * 100}%`,
            display: 'flex'
          }}
        >
          {/* Page 1 - System Apps + Featured Projects */}
          <div className="w-full px-6 py-4" style={{ width: `${100 / totalPages}%` }}>
            <div className="grid grid-cols-4 gap-6 auto-rows-max">
              {appsPage1.map((app, i) => (
                <MobileAppIcon key={i} icon={app.icon} label={app.label} gradient={app.gradient} onClick={app.action} />
              ))}
              {projectsPage1.map((project) => (
                <MobileProjectIcon key={project.id} project={project} onClick={() => handleProjectClick(project)} />
              ))}
            </div>
          </div>

          {/* Page 2 - More Projects */}
          <div className="w-full px-6 py-4" style={{ width: `${100 / totalPages}%` }}>
            <div className="grid grid-cols-4 gap-6 auto-rows-max">
              {projectsPage2.map((project) => (
                <MobileProjectIcon key={project.id} project={project} onClick={() => handleProjectClick(project)} />
              ))}
            </div>
          </div>
        </div>

        {/* Page Indicator Dots */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-40">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`h-1 rounded-full transition-all ${
                i === currentPage ? 'bg-white w-6' : 'bg-white/40 w-1'
              }`}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>

        {/* iOS-style Navigation Bar with 3 buttons */}
        <div className="absolute bottom-0 left-0 right-0 h-20 flex items-center justify-around px-8 bg-gray-900/50 backdrop-blur-2xl border-t border-white/10">
          <button
            onClick={() => {
              if (currentPage > 0) {
                setCurrentPage(prev => prev - 1);
              }
            }}
            className="flex flex-col items-center gap-1 text-white/70 hover:text-white active:scale-95 transition-all disabled:opacity-40"
            disabled={currentPage === 0}
            aria-label="Previous Page"
          >
            <MdArrowBack size={24} />
            <span className="text-xs font-medium">Back</span>
          </button>
          
          <button
            onClick={goToHome}
            className="flex flex-col items-center gap-1 text-white active:scale-95 transition-all"
            aria-label="Home"
          >
            <div className="w-10 h-10 rounded-full bg-blue-500/90 flex items-center justify-center shadow-lg">
              <MdHome size={24} />
            </div>
            <span className="text-xs font-semibold">Home</span>
          </button>
          
          <button
            onClick={() => setActiveView('finder')}
            className="flex flex-col items-center gap-1 text-white/70 hover:text-white active:scale-95 transition-all"
            aria-label="All Projects"
          >
            <img src="/assests/icons/Finder.png" alt="Apps" className="w-6 h-6 opacity-90" />
            <span className="text-xs font-medium">Apps</span>
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
            onClick={goToHome}
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

        {/* iOS Navigation Bar */}
        <div className="fixed bottom-0 left-0 right-0 h-20 flex items-center justify-around px-8 bg-white/95 dark:bg-gray-800/95 backdrop-blur-2xl border-t border-gray-300 dark:border-gray-700">
          <button
            onClick={goToHome}
            className="flex flex-col items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white active:scale-95 transition-all"
            aria-label="Back"
          >
            <MdArrowBack size={24} />
            <span className="text-xs font-medium">Back</span>
          </button>
          
          <button
            onClick={goToHome}
            className="flex flex-col items-center gap-1 active:scale-95 transition-all"
            aria-label="Home"
          >
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shadow-lg">
              <MdHome size={24} className="text-white" />
            </div>
            <span className="text-xs font-semibold text-gray-900 dark:text-white">Home</span>
          </button>
          
          <button
            onClick={() => setActiveView('finder')}
            className="flex flex-col items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white active:scale-95 transition-all"
            aria-label="All Projects"
          >
            <img src="/assests/icons/Finder.png" alt="Apps" className="w-6 h-6" />
            <span className="text-xs font-medium">Apps</span>
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
            onClick={goToHome}
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

        {/* iOS Navigation Bar */}
        <div className="fixed bottom-0 left-0 right-0 h-20 flex items-center justify-around px-8 bg-gray-100/95 dark:bg-gray-900/95 backdrop-blur-2xl border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={goToHome}
            className="flex flex-col items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white active:scale-95 transition-all"
            aria-label="Back"
          >
            <MdArrowBack size={24} />
            <span className="text-xs font-medium">Back</span>
          </button>
          
          <button
            onClick={goToHome}
            className="flex flex-col items-center gap-1 text-white active:scale-95 transition-all"
            aria-label="Home"
          >
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shadow-lg">
              <MdHome size={24} />
            </div>
            <span className="text-xs font-semibold text-gray-900 dark:text-white">Home</span>
          </button>
          
          <button
            onClick={() => setActiveView('finder')}
            className="flex flex-col items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white active:scale-95 transition-all"
            aria-label="All Projects"
          >
            <img src="/assests/icons/Finder.png" alt="Apps" className="w-6 h-6" />
            <span className="text-xs font-medium">Apps</span>
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default MobileHome;
