
import React, { useState, useEffect, useRef } from 'react';

const ScrollBadge: React.FC = () => {
  const [isObstructed, setIsObstructed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Refs for animation values to avoid React state overhead in the 60fps loop
  const ringRef = useRef<HTMLDivElement>(null);
  const ringInnerRef = useRef<HTMLDivElement>(null);
  
  const targetX = useRef(88);
  const targetY = useRef(40);
  const targetRot = useRef(0);
  
  const currentX = useRef(88);
  const currentY = useRef(40);
  const currentRot = useRef(0);
  
  const requestRef = useRef<number>();
  const isObstructedRef = useRef(false);

  // LERP factor for organic momentum
  const EASE = 0.08;

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      targetX.current = mobile ? 82 : 88;
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });

    // Section monitoring for obstruction/clash prevention
    const observer = new IntersectionObserver((entries) => {
      const obstructed = entries.some(entry => entry.isIntersecting);
      setIsObstructed(obstructed);
      isObstructedRef.current = obstructed;
    }, { 
      threshold: 0.05,
      rootMargin: '0px 0px -10% 0px'
    });

    const sections = ['services', 'process', 'contact'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const animate = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;

      /**
       * PATH LOGIC:
       * 1. Start: Right side (88vw), mid-high (40vh).
       * 2. Phase 1 (0-35vh scroll): Slide horizontally to the LEFT edge (5vw).
       * 3. Phase 2 (35-80vh scroll): Slide vertically down along that LEFT edge (up to 85vh).
       */
      const phase1_start = 0;
      const phase1_end = vh * 0.35;
      const phase2_end = vh * 0.85;
      
      const startX = isMobile ? 85 : 88;
      const startY = isMobile ? 35 : 40;
      const leftEdgeX = isMobile ? 12 : 8; // Distance from left edge
      const bottomY = isMobile ? 85 : 75;

      let tX = startX;
      let tY = startY;

      if (y <= phase1_end) {
        // Horizontal slide to the left
        const p = (y - phase1_start) / (phase1_end - phase1_start);
        const ease = 1 - Math.pow(1 - p, 3); // easeOutCubic
        tX = startX - (ease * (startX - leftEdgeX));
        tY = startY;
      } else if (y <= phase2_end) {
        // Vertical slide down the left edge
        const p = (y - phase1_end) / (phase2_end - phase1_end);
        const ease = 1 - Math.pow(1 - p, 2); // easeOutQuad
        tX = leftEdgeX;
        tY = startY + (ease * (bottomY - startY));
      } else {
        // Stick at bottom-left
        tX = leftEdgeX;
        tY = bottomY;
      }

      // Special parking override for footer/contact obstruction
      const parkingPos = isMobile ? { x: 5, y: 92 } : { x: 4, y: 88 };
      if (isObstructedRef.current) {
        targetX.current = parkingPos.x;
        targetY.current = parkingPos.y;
      } else {
        targetX.current = tX;
        targetY.current = tY;
      }

      targetRot.current = y * 0.25;

      // Apply LERP for buttery smooth motion
      currentX.current += (targetX.current - currentX.current) * EASE;
      currentY.current += (targetY.current - currentY.current) * EASE;
      currentRot.current += (targetRot.current - currentRot.current) * 0.12;

      // Direct DOM manipulation for maximum performance
      if (ringRef.current) {
        const scale = isObstructedRef.current ? 0.8 : 1;
        const opacity = isObstructedRef.current ? 0.4 : 1;
        
        ringRef.current.style.left = `${currentX.current}vw`;
        ringRef.current.style.top = `${currentY.current}vh`;
        ringRef.current.style.opacity = opacity.toString();
        ringRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`;
      }

      if (ringInnerRef.current) {
        ringInnerRef.current.style.transform = `rotate(${currentRot.current}deg)`;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', checkMobile);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      observer.disconnect();
    };
  }, [isMobile]);

  return (
    <div 
      id="ring-layer"
      ref={ringRef}
      className="fixed w-[90px] h-[90px] md:w-[130px] md:h-[130px] z-[900] flex items-center justify-center pointer-events-none mix-blend-difference text-white gpu-accel overflow-visible transition-opacity duration-1000"
      style={{ 
        left: `${currentX.current}vw`, 
        top: `${currentY.current}vh`,
        display: 'flex',
        willChange: 'left, top, transform, opacity'
      }}
    >
      <div 
        ref={ringInnerRef}
        className="absolute inset-0 w-full h-full overflow-visible"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full fill-current overflow-visible">
          <defs>
            <path id="badgePath" d="M 100, 100 m -85, 0 a 85,85 0 1,1 170,0 a 85,85 0 1,1 -170,0" />
          </defs>
          <text className="font-mono text-[10px] md:text-[11px] font-bold tracking-[1.5px] uppercase">
            <textPath href="#badgePath" startOffset="0%">
              Financial Advisory • Capital Strategy •&nbsp;
            </textPath>
          </text>
        </svg>
      </div>
      <div className="relative z-10 text-center font-mono font-bold leading-none text-[10px] md:text-[14px] tracking-widest drop-shadow-lg">
        MTG<br />GROUP
      </div>
    </div>
  );
};

export default ScrollBadge;
