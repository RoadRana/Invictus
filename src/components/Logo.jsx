import { useEffect, useRef } from 'react';
import './Logo.css';

export default function Logo({ size = 200, title = 'Invictus ROV' }) {
  const armRef = useRef(null);

  useEffect(() => {
    const arm = armRef.current;
    if (!arm) return;
    let raf = 0;
    let t0 = performance.now();
    const loop = (t) => {
      const dt = (t - t0) / 1000;
      const angle = Math.sin(dt * Math.PI) * 10; 
      arm.style.transform = `rotate(${angle}deg)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="logo-card" aria-label="Invictus Logo">
      <svg
        className="logo-svg"
        width={size}
        height={size}
        viewBox="0 0 200 200"
        role="img"
        aria-labelledby="logoTitle"
      >
        <title id="logoTitle">{title}</title>

        {/* Backplate */}
        <rect
          x="8"
          y="8"
          width="184"
          height="184"
          rx="20"
          className="card-bg"
        />

        {/* Waves */}
        <path
          className="wave"
          d="M20,135 Q40,125 60,135 T100,135 T140,135 T180,135"
          fill="none"
        />

        {/* ROV */}
        <g className="rov">
          <ellipse cx="100" cy="100" rx="54" ry="26" />
          <rect x="94" y="60" width="12" height="38" rx="3" />
        </g>

        {/* Arm */}
        <g
          className="arm"
          ref={armRef}
          style={{ transformOrigin: '160px 100px' }}
        >
          <line x1="160" y1="100" x2="186" y2="86" />
          <circle cx="186" cy="86" r="5" />
        </g>
      </svg>

      <div className="logo-caption">
        <h3 className="logo-title">ROV</h3>
        <p className="logo-tag">Innovating Underwater Robotics</p>
      </div>
    </div>
  );
}
