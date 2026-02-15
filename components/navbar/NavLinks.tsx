import React from 'react';
import Link from 'next/link';

interface NavLinksProps {
  isScrolled: boolean;
}

const links = [
  { name: 'About', href: '/about' },
  { name: 'Events', href: '/events' },
  { name: 'Projects', href: '/projects' },
  { name: 'Team', href: '/team' },
  { name: 'Contact', href: '/contact' },
];

const NavLinks: React.FC<NavLinksProps> = ({ isScrolled }) => {
  return (
    <ul 
      className={`
        flex items-center 
        transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)]
        ${isScrolled ? 'gap-1' : 'gap-2'} 
      `}
    >
      {links.map((link) => (
        <li key={link.name}>
          <Link 
            href={link.href}
            className={`
              group relative flex items-center justify-center
              px-4 py-2 rounded-full overflow-hidden
              transition-all duration-300 ease-out
              outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50
            `}
          >
            {/* HOVER BACKGROUND (The "Pill")
               - Initially invisible
               - On hover: Becomes a subtle glass layer (white/5)
               - This replaces cheap underlines with a premium "zone" feel
            */}
            <div 
              className={`
                absolute inset-0 rounded-full opacity-0 
                bg-gradient-to-b from-white/10 to-transparent
                group-hover:opacity-100 transition-opacity duration-300
                ${isScrolled ? 'bg-white/5' : 'bg-white/5'}
              `} 
            />
            
            {/* HOVER GLOW (Bottom Reflection)
               - Adds a tiny rim light at the bottom of the button on hover
            */}
            <div 
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-blue-400/50 blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500" 
            />

            {/* TEXT LABEL */}
            <span 
              className={`
                relative z-10 text-sm font-medium tracking-wide
                transition-colors duration-300
                ${isScrolled 
                  ? 'text-neutral-400 group-hover:text-white' 
                  : 'text-neutral-300 group-hover:text-white'
                }
              `}
            >
              {link.name}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;