import React, { useRef, useEffect } from 'react';
import { PROFILE, SKILLS } from '../../data/projects';
import { Github, Linkedin, Mail, Phone, ExternalLink } from 'lucide-react';

const Welcome = () => {
  const containerRef = useRef(null);
  const charsRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chars = charsRef.current;
    const maxDistance = 150;

    const handleMouseMove = (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      chars.forEach(char => {
        if (!char) return;
        const charRect = char.getBoundingClientRect();
        const charCenterX = charRect.left + charRect.width / 2;
        const charCenterY = charRect.top + charRect.height / 2;

        const deltaX = mouseX - charCenterX;
        const deltaY = mouseY - charCenterY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (distance < maxDistance) {
          const intensity = Math.pow(1 - distance / maxDistance, 2);
          const fontWeight = 300 + (600 * intensity);
          char.style.fontWeight = fontWeight;
          char.style.transition = 'font-weight 0.1s ease-out';
        } else {
          char.style.fontWeight = 300;
        }
      });
    };

    const handleMouseLeave = () => {
      chars.forEach(char => {
        if (!char) return;
        char.style.fontWeight = 300;
        char.style.transition = 'font-weight 0.3s ease-out';
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const greeting = `Hello, I'm ${PROFILE.name}.`;

  return (
    <div
      ref={containerRef}
      className="h-full flex flex-col items-center justify-center text-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 overflow-y-auto"
    >
      <div className="w-24 h-24 rounded-full overflow-hidden mb-6 shadow-xl ring-4 ring-white dark:ring-gray-700">
        <img 
          src="/assests/profile_photo/pic.png" 
          alt="Profile" 
          className="w-full h-full object-cover"
        />
      </div>

      <h1 className="text-4xl mb-2 text-gray-800 dark:text-white">
        {greeting.split('').map((char, i) => (
          <span
            key={i}
            ref={el => charsRef.current[i] = el}
            style={{ fontWeight: 300 }}
            className="inline-block"
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h1>

      <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold mb-2">
        {PROFILE.title}
      </p>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-md">
        {PROFILE.degree} @ {PROFILE.university}
      </p>

      <p className="text-base text-gray-700 dark:text-gray-300 mb-8 max-w-2xl leading-relaxed">
        {PROFILE.bio}
      </p>

      {/* Tech Stack */}
      <div className="mb-8 w-full max-w-2xl">
        <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">Tech Stack</h3>
        <div className="flex flex-wrap gap-2 justify-center">
          {[...SKILLS.languages, ...SKILLS.frameworks].slice(0, 10).map((skill, i) => (
            <span key={i} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Contact Links */}
      <div className="flex gap-4 mb-6">
        <a
          href={PROFILE.github}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-gray-800 hover:bg-gray-700 text-white rounded-full transition-all shadow-lg hover:shadow-xl"
          title="GitHub"
        >
          <Github size={20} />
        </a>
        <a
          href={PROFILE.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all shadow-lg hover:shadow-xl"
          title="LinkedIn"
        >
          <Linkedin size={20} />
        </a>
        <a
          href={`mailto:${PROFILE.email}`}
          className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-full transition-all shadow-lg hover:shadow-xl"
          title="Email"
        >
          <Mail size={20} />
        </a>
        <a
          href={`https://wa.me/${PROFILE.whatsapp.replace(/\D/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-green-600 hover:bg-green-700 text-white rounded-full transition-all shadow-lg hover:shadow-xl"
          title="WhatsApp"
        >
          <Phone size={20} />
        </a>
      </div>

      <div className="flex gap-3">
        <a
          href={PROFILE.cvPath}
          download
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-all shadow-lg hover:shadow-blue-500/30 flex items-center gap-2"
        >
          Download CV
          <ExternalLink size={16} />
        </a>
        <a
          href={PROFILE.portfolio}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-medium transition-all shadow-lg hover:shadow-purple-500/30 flex items-center gap-2"
        >
          Live Portfolio
          <ExternalLink size={16} />
        </a>
      </div>
    </div>
  );
};

export default Welcome;

