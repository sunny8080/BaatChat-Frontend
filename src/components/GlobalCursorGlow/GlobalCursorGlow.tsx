import { useEffect, useRef } from 'react';

const GlobalCursorGlow = () => {
  const globalGlowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!globalGlowRef.current) return;
      globalGlowRef.current.style.setProperty('--mouseX', e.clientX + 'px');
      globalGlowRef.current.style.setProperty('--mouseY', e.clientY + 'px');
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  return <div className="global-cursor-glow" ref={globalGlowRef}></div>;
};

export default GlobalCursorGlow;
