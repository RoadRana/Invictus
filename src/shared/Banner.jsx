// @ts-check
import { useEffect, useState } from 'react';

/**
 * @typedef {Object} BannerProps
 * @property {string} banner
 * @property {string} heading
 * @property {string=} subsheading                 // optional
 * @property {import('react').ReactNode=} children // optional
 */

/** @param {BannerProps} props */
const Banner = ({ banner, heading, subsheading = '', children = null }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className="w-full h-[700px] bg-cover bg-center flex items-end justify-start"
      style={{
        backgroundImage: `url(${banner})`,
        backgroundAttachment: 'fixed',
      }}
    >
      <div
        className={`bg-black bg-opacity-0 p-8 md:p-12 text-left rounded-md max-w-3xl mb-16 ml-8 transition-all duration-1000 ease-in-out transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight drop-shadow-lg">
          {heading}
        </h2>

        {subsheading && (
          <p className="text-xl md:text-2xl text-gray-200 mb-6 leading-relaxed">
            {subsheading}
          </p>
        )}

        {children && <div className="mt-4">{children}</div>}
      </div>
    </div>
  );
};

export default Banner;
