
import { useEffect, useRef } from 'react';

export function Reveal({ children, delay = 0, y = 10 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ro = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.style.transition = `transform 520ms cubic-bezier(0.22,1,0.36,1) ${delay}s, opacity 520ms ease-out ${delay}s, filter 520ms ease-out ${delay}s`;
            el.style.transform = 'translateY(0) scale(1)';
            el.style.opacity = '1';
            el.style.filter = 'blur(0)';
            ro.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );

    ro.observe(el);
    return () => ro.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: `translateY(${y}px) scale(0.995)`,
        filter: 'blur(2px)',
        willChange: 'transform, opacity, filter',
        backfaceVisibility: 'hidden',
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </div>
  );
}
