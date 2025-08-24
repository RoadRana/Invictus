import  { useEffect, useState } from 'react';

const Banner = ({ banner, heading, subsheading, children }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsVisible(true);
        }, 300);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div
            className='w-full h-[700px] bg-cover bg-center flex items-end justify-start'
            style={{ backgroundImage: `url(${banner})`, backgroundAttachment: 'fixed' }}
        >
            <div
                className={`bg-black bg-opacity-0 p-8 md:p-12 text-left rounded-md max-w-3xl mb-12 ml-9 transition-all duration-1000 ease-in-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
            >
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight drop-shadow-lg">
                    {heading}
                </h2>
                <p className='text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed'>
                    {subsheading}
                </p>
                <div className="mt-2">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Banner;
