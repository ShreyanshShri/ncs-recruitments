import React, { useEffect } from 'react';
import Link from 'next/link';

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isScrolled: boolean;
}

const navLinks = [
  { name: 'About', href: '/about' },
  { name: 'Events', href: '/events' },
  { name: 'Projects', href: '/projects' },
  { name: 'Team', href: '/team' },
  { name: 'Contact', href: '/contact' },
];

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, setIsOpen, isScrolled }) => {
  // Lock body scroll when menu is open to prevent background scrolling
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      {/* --- 1. THE TRIGGER (Hamburger) --- 
          A kinetic button that morphs into an 'X'
      */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          relative z-[60] flex flex-col items-center justify-center w-10 h-10 rounded-full
          transition-all duration-300 active:scale-90 outline-none
          ${isOpen ? 'bg-transparent' : 'bg-white/5 border border-white/10'}
        `}
        aria-label="Toggle Menu"
      >
        {/* Top Line */}
        <span
          className={`
            block h-0.5 bg-white rounded-full transform transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
            ${isOpen ? 'w-6 rotate-45 translate-y-1.5' : 'w-5 translate-y-[-4px]'}
          `}
        />
        {/* Middle Line */}
        <span
          className={`
            block h-0.5 bg-white rounded-full transform transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
            ${isOpen ? 'w-0 opacity-0' : 'w-5 opacity-100'}
          `}
        />
        {/* Bottom Line */}
        <span
          className={`
            block h-0.5 bg-white rounded-full transform transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
            ${isOpen ? 'w-6 -rotate-45 -translate-y-1.5' : 'w-5 translate-y-[4px]'}
          `}
        />
      </button>

      {/* --- 2. THE OVERLAY (Fullscreen Menu) --- 
          Fades in and blurs the background
      */}
      <div
        className={`
          fixed inset-0 z-50 flex flex-col justify-center items-center
          bg-black/90 backdrop-blur-[40px] supports-[backdrop-filter]:bg-black/60
          transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
      >
        {/* Ambient Background Gradient (Nebula feel inside the menu) */}
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

        {/* Navigation Links Container */}
        <nav className="relative z-10 flex flex-col items-center gap-8">
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`
                text-3xl font-light tracking-tight text-white
                transform transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                hover:text-blue-400 hover:scale-110 hover:tracking-widest
                ${isOpen 
                  ? 'translate-y-0 opacity-100 blur-0' 
                  : 'translate-y-10 opacity-0 blur-sm'
                }
              `}
              // Staggered Delay for "Waterfall" Effect
              style={{ transitionDelay: `${isOpen ? index * 100 : 0}ms` }}
            >
              {link.name}
            </Link>
          ))}
          
          {/* Mobile CTA (Appears last) */}
          <div 
            className={`
              mt-8 transform transition-all duration-700 delay-500
              ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
            `}
          >
             <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className="px-8 py-3 rounded-full bg-white text-black font-bold tracking-wide hover:bg-blue-50 transition-colors"
             >
                JOIN THE SOCIETY
             </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;