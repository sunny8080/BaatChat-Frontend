import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

const RevealOnScroll = ({ children, className = '' }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      },
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className={`${className || ''} reveal-on-scroll`}>
      {children}
    </div>
  );
};

export default RevealOnScroll;
