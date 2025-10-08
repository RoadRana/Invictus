import  { useEffect, useRef, useState } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaBars } from "react-icons/fa";
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import StaffLogin from './Stafflogin'; // Import StaffLogin component

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navItems = [
        { link: 'Home', path: 'home' },
        { link: 'About', path: 'about' },
        { link: 'Services', path: 'services' },
        { link: 'Products', path: 'products' },
        { link: 'Community', path: 'community' },
        { link: 'Contact', path: 'contact' },
    ];

    const logoRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 100 / 100, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(100, 100);
        logoRef.current.appendChild(renderer.domElement);

        const light = new THREE.PointLight(0xffffff, 1, 100);
        light.position.set(5, 5, 5);
        scene.add(light);

        camera.position.z = 3;

        return () => {
            if (logoRef.current) {
                logoRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <>
            {/* Fixed Navbar */}
            <nav
                className='bg-white md:px-14 p-4 max-w-screen-2xl border-b mx-auto text-primary fixed top-0 right-0 left-0 z-50 shadow-md'
            >
                <div className='container mx-auto flex justify-between items-center font-medium'>
                    <div className='flex space-x-14 items-center'>
                        {/* Logo */}
                        <Link to="/home" className='text-2xl font-semibold flex items-center space-x-3 text-primary'>
                            <div ref={logoRef} className='w-16 h-16 inline-block'></div>
                            <span>Invictus</span>
                        </Link>
                        {/* Desktop Navigation */}
                        <ul className='md:flex space-x-12 hidden'>
                            {navItems.map(({ link, path }) => (
                                <Link key={link} to={path} className='block hover:text-secondary'>
                                    {link}
                                </Link>
                            ))}
                        </ul>
                    </div>
                    <div className='space-x-12 hidden md:flex items-center'>
                        {/* Social Icons */}
                        <a href="/" className='hidden lg:flex items-center hover:text-secondary'>
                            <FaFacebookF />
                        </a>
                        <a href="/" className='hidden lg:flex items-center hover:text-secondary'>
                            <FaTwitter />
                        </a>
                        <a href="/" className='hidden lg:flex items-center hover:text-secondary'>
                            <FaInstagram />
                        </a>
                        {/* Staff Login */}
                        <StaffLogin />
                        {/* Sign Up Button */}
                        <Link to="/signup">
                            <button className='bg-primary py-2 px-4 transition-all duration-300 text-white rounded hover:text-white hover:bg-indigo-600'>
                                Sign Up
                            </button>
                        </Link>
                    </div>
                    {/* Mobile Menu Toggle */}
                    <div className='md:hidden'>
                        <button onClick={toggleMenu} className='text-primary focus:outline-none focus:text-gray-300'>
                            <FaBars className='w-6 h-6' />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div
                className={`space-y-4 px-4 pt-12 pb-5 bg-white shadow-lg ${isMenuOpen ? "block fixed top-16 right-0 left-0 z-40" : "hidden"
                    }`}
            >
                {navItems.map(({ link, path }) => (
                    <Link key={link} to={path} className='block hover:text-gray-600'>
                        {link}
                    </Link>
                ))}
            </div>
        </>
    );
};

export default Navbar;
