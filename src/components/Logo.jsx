// src/components/Logo.js
import React, { useEffect } from 'react';
import './Logo.css';

const Logo = () => {
    useEffect(() => {
        // JavaScript to manipulate the SVG elements if needed
        // Example: Simple animation for the robotic arm
        const arm = document.querySelector('line');
        const armAnimation = () => {
            arm.animate([
                { transform: 'rotate(0deg)', transformOrigin: '160px 100px' },
                { transform: 'rotate(20deg)', transformOrigin: '160px 100px' },
                { transform: 'rotate(0deg)', transformOrigin: '160px 100px' }
            ], {
                duration: 2000,
                iterations: Infinity
            });
        };

        armAnimation();
    }, []);

    return (
        <div className="logo-container">
            <svg id="rovLogo" width="200" height="200" viewBox="0 0 200 200">
                {/* Submarine Body */}
                <ellipse cx="100" cy="100" rx="60" ry="30" fill="#007BFF" />
                {/* Submarine Periscope */}
                <rect x="90" y="50" width="20" height="50" fill="#007BFF" />
                {/* Robotic Arm */}
                <line x1="160" y1="100" x2="190" y2="80" stroke="#007BFF" strokeWidth="4" />
                <circle cx="190" cy="80" r="5" fill="#007BFF" />
                {/* Waves */}
                <path d="M20,130 Q40,120 60,130 T100,130 T140,130 T180,130" fill="none" stroke="#00BFFF" strokeWidth="4" />
            </svg>
            <div className="logo-text">ROV</div>
            <div className="tagline">Innovating Underwater Robotics</div>
        </div>
    );
};

export default Logo;
