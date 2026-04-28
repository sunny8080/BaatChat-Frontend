import { useCallback, useEffect, useRef } from 'react';
type Props = {
  options?: any;
};
const useRevealOnScroll = ({ options = { threshold: 0.1 } }: Props = {}) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementsRef = useRef(new Set<HTMLElement>());

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries, obs) => {
      // entries - all observed elements whose visibility changed just now after scroll
      entries.forEach((entry, ind) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), ind * 80);

          // observer once, so delete from elements set also
          obs.unobserve(entry.target);
          elementsRef.current.delete(entry.target as HTMLElement);
        }
      });
    }, options);

    elementsRef.current.forEach((el) => observerRef.current!.observe(el));
    return () => {
      observerRef.current?.disconnect();
    };
  }, [options]);

  // reveal element on scroll
  // Need to add class 'reveal-on-scroll' on element whose we want to reveal
  // if element has it's own transition then add that property in '--extra-transition' also
  const registerRevealOnScroll = useCallback((el: HTMLElement | null) => {
    console.log(el);
    if (!el || elementsRef.current.has(el)) return;
    elementsRef.current.add(el);
    if (observerRef.current) {
      observerRef.current.observe(el);
    }
  }, []);

  return registerRevealOnScroll;
};

export default useRevealOnScroll;
