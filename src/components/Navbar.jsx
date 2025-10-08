import  {  useState } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaBars } from "react-icons/fa";
import {FaLinkedinIn} from "/Users/rana.adel@dragons-group.com/Downloads/personal/INVICTUS-WebApp/Invictus/node_modules/react-icons/fa/index";
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpeg';



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
        // { link: 'Community', path: 'community' },
        { link: 'Contact', path: 'contact' },
    ];




    return (
        <>
            <nav
                className='bg-white md:px-14 p-4 max-w border-b mx-auto text-primary fixed top-0 right-0 left-0 z-50 '
            >
                <div className='container mx-auto flex justify-between items-center font-medium'>
                    <div className='flex space-x-14 items-center'>
                        {/* Logo */}
                        <Link to="/home">
                            <div className="h-14 w-auto">
                                <img src={logo} alt="Invictus Logo" className='h-full w-auto object-contain' />
                            </div>
                        </Link>
                        {/* Desktop Navigation */}
                        <ul className='md:flex space-x-12 hidden text-primary'>
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
                        <a href="https://www.linkedin.com/company/invictusumvs/" className='hidden lg:flex items-center hover:text-secondary' target='_blank' rel='noopener noreferrer'>
                            <FaLinkedinIn />
                        </a>


                        {/* Sign Up Button */}
                        <Link
    to="/signup"
    className=" text-primary  hover:text-secondary"
>
    Sign Up
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
