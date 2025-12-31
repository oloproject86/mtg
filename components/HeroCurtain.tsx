
import React, { useState, useEffect, useRef, useCallback } from 'react';

const HeroCurtain: React.FC = () => {
  const [currentX, setCurrentX] = useState(0);
  const [targetX, setTargetX] = useState(0);
  const [isActive, setIsActive] = useState<'light' | 'dark' | null>(null);
  const [isMobileMode, setIsMobileMode] = useState(false);
  const [mobileFocus, setMobileFocus] = useState<'light' | 'dark'>('light');
  
  const currentXRef = useRef(0);
  const targetXRef = useRef(0);
  const requestRef = useRef<number>();

  const LERP_EASE = 0.12;

  const checkMode = useCallback(() => {
    const mobile = window.innerWidth < 980;
    setIsMobileMode(mobile);
    if (!mobile) {
      const initialX = window.innerWidth / 2;
      targetXRef.current = initialX;
      currentXRef.current = initialX;
      setTargetX(initialX);
      setCurrentX(initialX);
    }
  }, []);

  useEffect(() => {
    checkMode();
    window.addEventListener('resize', checkMode, { passive: true });
    return () => window.removeEventListener('resize', checkMode);
  }, [checkMode]);

  const animate = useCallback(() => {
    if (isMobileMode) return;

    const diff = targetXRef.current - currentXRef.current;
    
    // Threshold to stop animation when "settled"
    if (Math.abs(diff) < 0.1) {
      currentXRef.current = targetXRef.current;
      setCurrentX(currentXRef.current);
      requestRef.current = undefined;
      return;
    }

    currentXRef.current += diff * LERP_EASE;
    setCurrentX(currentXRef.current);

    const percent = currentXRef.current / window.innerWidth;
    if (percent < 0.35) setIsActive('light');
    else if (percent > 0.65) setIsActive('dark');
    else setIsActive(null);
    
    requestRef.current = requestAnimationFrame(animate);
  }, [isMobileMode]);

  const startAnimation = useCallback(() => {
    if (!requestRef.current) {
      requestRef.current = requestAnimationFrame(animate);
    }
  }, [animate]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobileMode) return;
    targetXRef.current = e.clientX;
    startAnimation();
  };

  if (isMobileMode) {
    return (
      <section className="relative w-full h-[85vh] overflow-hidden bg-brand-dark z-[10] flex flex-col no-scroll-capture" aria-label="Strategy Focus Switcher">
        <div className="flex-1 relative overflow-hidden">
           <div className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col justify-center items-center text-center px-6 ${
             mobileFocus === 'light' ? 'opacity-100 scale-100 z-[2] bg-brand-light' : 'opacity-0 scale-95 pointer-events-none z-[1]'
           }`}>
              <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1080&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-20" alt="" />
              <div className="relative z-10 py-4">
                <span className="font-mono text-brand-text/50 uppercase tracking-[0.2em] mb-4 text-[12px] block">Individuals / JDG</span>
                <h2 className="font-display font-bold text-brand-text text-[40px] leading-[1.1] uppercase mb-10 overflow-visible">Financial<br/>Advisory</h2>
                <a href="#contact" className="px-10 py-4 bg-brand-text text-white rounded-full font-mono text-[12px] uppercase tracking-widest font-bold inline-block shadow-lg focus-visible:ring-4 focus-visible:ring-brand-accent">Audit & Plans</a>
              </div>
           </div>
           
           <div className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col justify-center items-center text-center px-6 ${
             mobileFocus === 'dark' ? 'opacity-100 scale-100 z-[2] bg-brand-dark' : 'opacity-0 scale-95 pointer-events-none z-[1]'
           }`}>
              <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1080&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-40" alt="" />
              <div className="relative z-10 py-4">
                <span className="font-mono text-white/50 uppercase tracking-[0.2em] mb-4 text-[12px] block">Corporations / Entities</span>
                <h2 className="font-display font-bold text-white text-[40px] leading-[1.1] uppercase mb-10 overflow-visible">Capital<br/>Strategy</h2>
                <a href="#contact" className="px-10 py-4 bg-white text-brand-dark rounded-full font-mono text-[12px] uppercase tracking-widest font-bold inline-block shadow-lg focus-visible:ring-4 focus-visible:ring-brand-accent">Management</a>
              </div>
           </div>
        </div>

        <div className="p-8 bg-brand-light border-t border-black/5 flex justify-center gap-4 z-[20]">
          <button onClick={() => setMobileFocus('light')} aria-pressed={mobileFocus === 'light'} className={`px-6 py-3 rounded-xl font-mono text-[10px] uppercase tracking-widest transition-all focus:ring-2 focus:ring-brand-accent ${mobileFocus === 'light' ? 'bg-brand-text text-white shadow-xl' : 'bg-white text-brand-text border border-black/5'}`}>Individual</button>
          <button onClick={() => setMobileFocus('dark')} aria-pressed={mobileFocus === 'dark'} className={`px-6 py-3 rounded-xl font-mono text-[10px] uppercase tracking-widest transition-all focus:ring-2 focus:ring-brand-accent ${mobileFocus === 'dark' ? 'bg-brand-text text-white shadow-xl' : 'bg-white text-brand-text border border-black/5'}`}>Corporate</button>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full h-[calc(100svh-80px)] overflow-hidden bg-brand-dark cursor-none z-[10]" onMouseMove={handleMouseMove} aria-label="Interactive Strategy Showcase">
      <div className="absolute inset-0 bg-brand-dark overflow-hidden z-[1]">
        <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 brightness-[0.6] ${isActive === 'dark' ? 'opacity-80' : 'opacity-30'}`} alt="" />
        <div className="container mx-auto px-6 h-full flex items-center">
          <div className="ml-auto w-1/2 pl-24 pointer-events-none select-none py-8">
             <span className="font-mono text-white/50 uppercase tracking-[0.2em] mb-4 block">Corporations / Entities</span>
             <h2 className="font-display font-bold text-white text-[clamp(40px,5.5vw,80px)] leading-[1.0] uppercase mb-8 overflow-visible">Capital<br/>Strategy</h2>
             <a href="#contact" className="pointer-events-auto inline-block px-10 py-5 border border-white text-white rounded-full font-mono text-[12px] uppercase tracking-widest hover:bg-white hover:text-brand-dark focus:bg-white focus:text-brand-dark transition-all duration-300">Strategic Plan</a>
          </div>
        </div>
      </div>

      <div className="absolute inset-y-0 left-0 bg-brand-light overflow-hidden z-[2] border-r border-white/10 gpu-accel" style={{ width: `${currentX}px` }}>
        <div className="w-screen h-full relative">
          <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop" className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 brightness-[0.9] ${isActive === 'light' ? 'opacity-80' : 'opacity-20'}`} alt="" />
          <div className="container mx-auto px-6 h-full flex items-center">
            <div className="w-1/2 pr-24 pointer-events-none select-none py-8">
               <span className="font-mono text-brand-text/50 uppercase tracking-[0.2em] mb-4 block">Individuals / JDG</span>
               <h2 className="font-display font-bold text-brand-text text-[clamp(40px,5.5vw,80px)] leading-[1.0] uppercase mb-8 overflow-visible">Financial<br/>Advisory</h2>
               <a href="#contact" className="pointer-events-auto inline-block px-10 py-5 border border-brand-text text-brand-text rounded-full font-mono text-[12px] uppercase tracking-widest hover:bg-brand-text hover:text-white focus:bg-brand-text focus:text-white transition-all duration-300">Audit & Plans</a>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-y-0 w-px bg-white/30 z-[3] pointer-events-none mix-blend-difference gpu-accel" style={{ left: `${currentX}px` }} aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full border border-white/20 backdrop-blur-xl flex items-center justify-center shadow-2xl">
          <div className="flex gap-1.5">
            <div className="w-1.5 h-1.5 bg-white rounded-full opacity-80"></div>
            <div className="w-1.5 h-1.5 bg-white rounded-full opacity-80"></div>
            <div className="w-1.5 h-1.5 bg-white rounded-full opacity-80"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCurtain;
