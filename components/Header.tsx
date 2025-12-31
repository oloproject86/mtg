
import React, { useState, useEffect, useRef } from 'react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastScrollState = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      if (scrolled !== lastScrollState.current) {
        lastScrollState.current = scrolled;
        setIsScrolled(scrolled);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Start', href: '#top' },
    { name: 'Services', href: '#services' },
    { name: 'Process', href: '#process' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  return (
    <>
      <header className={`fixed top-0 left-0 w-full h-20 z-[1000] flex items-center transition-all duration-300 border-b border-black/10 bg-brand-light ${isScrolled ? 'shadow-lg md:bg-white/90 md:backdrop-blur-md' : ''}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#top" className="flex flex-col py-1 leading-[1.1] gap-1 uppercase font-mono tracking-[0.22em] select-none overflow-visible focus-visible:outline-brand-accent" aria-label="MTG GROUP Home">
            <span className="text-[14px] font-bold text-transparent block" style={{ WebkitTextStroke: '1.2px #0b0f12', textShadow: '0.5px 0.5px 0 #0b0f12', paddingBottom: '2px' }}>MTG</span>
            <span className="text-[12px] font-semibold text-transparent block" style={{ WebkitTextStroke: '1px #0b0f12', textShadow: '0.5px 0.5px 0 #0b0f12', paddingBottom: '2px' }}>GROUP</span>
          </a>

          <nav className="hidden md:flex gap-8" aria-label="Main Navigation">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} className="font-mono text-[13px] uppercase tracking-wider hover:text-brand-accent transition-colors focus:text-brand-accent">{link.name}</a>
            ))}
          </nav>

          <button 
            className="w-11 h-11 border border-black/10 rounded-xl flex items-center justify-center relative z-[1102] hover:bg-black/5 focus:ring-2 focus:ring-brand-accent" 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            <div className={`w-5 h-0.5 bg-brand-text relative transition-all duration-300 ${isMenuOpen ? 'bg-transparent' : ''}`} aria-hidden="true">
              <div className={`absolute left-0 w-5 h-0.5 bg-brand-text transition-all duration-300 ${isMenuOpen ? 'top-0 rotate-45' : '-top-[7px]'}`}></div>
              <div className={`absolute left-0 w-5 h-0.5 bg-brand-text transition-all duration-300 ${isMenuOpen ? 'top-0 -rotate-45' : 'top-[7px]'}`}></div>
            </div>
          </button>
        </div>
      </header>

      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-[1099] transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={() => setIsMenuOpen(false)} 
        aria-hidden="true"
      />
      
      <div 
        id="mobile-navigation"
        className={`fixed top-0 right-0 w-full md:w-[360px] h-full bg-brand-light border-l border-black/10 transition-transform duration-500 z-[1100] p-10 pt-24 flex flex-col gap-4 ${isMenuOpen ? 'translate-x-0 shadow-2xl' : 'translate-x-full'}`}
        aria-hidden={!isMenuOpen}
      >
        <nav className="flex flex-col gap-3">
          {navLinks.map(link => (
            <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="font-mono uppercase tracking-widest text-[14px] p-4 border border-black/10 rounded-xl hover:bg-brand-dark hover:text-white transition-all focus:bg-brand-dark focus:text-white">{link.name}</a>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Header;
