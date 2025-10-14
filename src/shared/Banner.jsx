
import { useEffect, useRef, useState } from 'react';

/**
 * @typedef {Object} BannerProps
 * @property {string} banner
 * @property {string} heading
 * @property {string=} subsheading
 * @property {import('react').ReactNode=} children
 */
const Banner = ({ banner, heading, subsheading = '', children = null }) => {
  const [mounted, setMounted] = useState(false);
  const layerRef = useRef(null);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => setMounted(true), []);

  // Lightweight parallax — no background-attachment: fixed (avoids iOS jank)
  useEffect(() => {
    const onScroll = () => {
      lastY.current = window.scrollY;
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(() => {
          const y = lastY.current * 0.15; // subtle
          if (layerRef.current) {
            layerRef.current.style.transform = `translate3d(0, ${y}px, 0)`;
          }
          ticking.current = false;
        });
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="relative w-full h-[68vh] min-h-[520px] overflow-hidden">
      {/* Image layer */}
      <div
        ref={layerRef}
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage: `url(${banner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: 'translate3d(0,0,0)',
        }}
      />
      {/* Gradient scrim for legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0.15) 45%, rgba(0,0,0,0))',
        }}
      />
      {/* Content */}
      <div className="relative h-full flex items-end">
        <div
          className={[
            'm-6 md:m-10 lg:m-16',
            'transition-all duration-600 ease-apple',
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
          ].join(' ')}
        >
          <div className="rounded-3xl p-6 md:p-8 lg:p-9 bg-black/20 backdrop-blur-md border border-white/10 shadow-soft">
            {/* Slightly smaller, tighter type for smooth feel */}
            <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold tracking-tight text-white">
              {heading}
            </h2>
            {subsheading && (
              <p className="mt-2 text-[clamp(1rem,2.2vw,1.25rem)] text-white/90 leading-relaxed">
                {subsheading}
              </p>
            )}
            {children && <div className="mt-5">{children}</div>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
